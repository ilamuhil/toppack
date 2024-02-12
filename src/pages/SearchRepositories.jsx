// src/components/SearchRepositories.js

import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import useDebounce from '../hooks/useDebounce'
import useAlert from '../hooks/useAlert'
import { ReactComponent as ImportIcon } from './../assets/svg/import.svg'

import Alert from '../components/Alert'
import Header from '../components/Header'
const SearchRepositories = () => {
  const [searchKey, setSearchKey] = useState('')
  const searchValue = useDebounce(searchKey, 750)
  const [repositories, setRepositories] = useState([])
  const [importedRepositories, setImportedRepositories] = useState(
    JSON.parse(localStorage.getItem('importedRepositories')) || []
  )
  const { setFeedback, message, type } = useAlert()
  const isRepositoryImported = repository => {
    const { full_name: fullName } = repository
    return importedRepositories.some(
      importedRepository => importedRepository.fullName === fullName
    )
  }

  const reposList = repositories.map(repository => ({
    ...repository,
    imported: isRepositoryImported(repository),
  }))
  const [loading, setLoading] = useState(false)

  const searchRepositories = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${searchValue}`
      )
      const { items } = response.data
      setRepositories(items)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }, [searchValue])

  useEffect(() => {
    setFeedback('', 'error')
    if (searchValue) {
      searchRepositories(searchValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  useEffect(() => {
    const handleKeyPress = e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        document.querySelector('input').focus()
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  },[])

  const storeAndUpdateCount = (dependencies, repository) => {
    const { html_url: url, full_name: fullName, id: repo_id } = repository
    const packages = Object.keys(dependencies)
    const importedPackages =
      JSON.parse(localStorage.getItem('importedPackages')) || []
    packages.forEach(dependency => {
      //* remove any prefix from the dependency name
      if (['^', '~', '*'].some(prefix => dependency.startsWith(prefix))) {
        dependency = dependency.slice(1)
      }
      if (importedPackages.find(pkg => pkg.name === dependency)) {
        const pkg = importedPackages.find(pkg => pkg.name === dependency)
        if (pkg) pkg.count++
      } else {
        importedPackages.push({ name: dependency, count: 1 })
      }
    })
    localStorage.setItem('importedPackages', JSON.stringify(importedPackages))
    setFeedback('Repository imported successfully', 'success')
    const updatedImportedRepositories = [
      ...importedRepositories,
      { url, fullName, repo_id },
    ]
    setImportedRepositories(updatedImportedRepositories)
    localStorage.setItem(
      'importedRepositories',
      JSON.stringify(updatedImportedRepositories)
    )
  }

  const importRepository = async repository => {
    let data
    try {
      const response = await axios.get(
        repository.contents_url.replace('{+path}', 'package.json')
      )
      data = response.data
    } catch (e) {
      console.error(e)
      if (e?.response?.status === 404)
        setFeedback('Package.json file not found in this repository', 'error')
      else
        setFeedback('An error occurred while importing the repository', 'error')
      return
    }
    const content = JSON.parse(atob(data.content))
    const dependencies = content?.dependencies
    if (!dependencies || !Object.keys(dependencies)?.length) {
      setFeedback(
        'No dependencies were found in the package.json file of this repository',
        'error'
      )
    } else {
      //* ideally this operation would happen in database
      storeAndUpdateCount(dependencies, repository)
    }
  }

  return (
    <div className='p-4'>
      <Header
        headerText='Search Repositories'
        linkText='Packages'
        linkPath='/top-packages'
      />
      <div className='flex mb-4'>
        <input
          type='text'
          placeholder='Search for repositories... (command/ctrl + k to focus)'
          className='border border-gray-300 px-4 py-2 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 flex-grow placeholder:italic placeholder:text-slate-400'
          value={searchKey}
          onChange={e => setSearchKey(e.target.value)}
        />
      </div>

      {loading && (
        <i className='text-slate-400'>Searching for repositories...</i>
      )}

      {searchKey && repositories.length === 0 && !loading && (
        <i className='text-slate-400'>No Repositories found...</i>
      )}
      {message && (
        <Alert message={message} setFeedback={setFeedback} type={type} />
      )}
      {searchKey && !loading && Boolean(repositories?.length) && (
        <ul>
          {reposList.map(repository => (
            <li key={repository.id} className='mb-4'>
              <div className='flex gap-x-1'>
                <h6
                  className={
                    isRepositoryImported(repository)
                      ? 'text-red-400 font-bold'
                      : 'font-bold'
                  }>
                  Repository:
                </h6>
                <a
                  href={repository.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500 hover:text-blue-600 font-bold inline'>
                  {repository.full_name}
                </a>
              </div>
              <span className='text-amber-600 font-bold text-xs'>STARS :</span>{' '}
              <span className='text-xs'>{repository.stargazers_count}</span>{' '}
              <span className='text-amber-600 font-bold text-xs'>Forks :</span>{' '}
              <span className='text-xs'>{repository.forks_count}</span>
              <br />
              <button
                className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'
                onClick={() => importRepository(repository)}
                disabled={isRepositoryImported(repository)}>
                Import
                <ImportIcon className='inline ml-2 w-4 h-4 mb-1 ' />
              </button>
              <hr className='mt-6' />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchRepositories

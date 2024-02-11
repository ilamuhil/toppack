import React from 'react'
import { ReactComponent as ChevronRight } from './../assets/svg/chevron.svg'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
const clearImport = () => {
  localStorage.clear()
  document.location.href = '/'
}

const Header = (props) => {
  const { headerText, linkText, linkPath } = props
  const propTypes = {
    headerText: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    linkPath: PropTypes.string.isRequired,
  };

  Header.propTypes = propTypes;
  return (
    <div className='flex justify-between'>
        <div className='flex gap-10 items-end'>
        <h1 className='text-2xl mb-4 uppercase'>{ headerText}</h1>
          <Link
            to={linkPath}
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
            {linkText} <ChevronRight className='ml-2 inline mb-0.5 w-3 h-3' />{' '}
          </Link>
        </div>
        <button
          className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium text-xs px-3 py-1 me-2 mb-3 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 rounded-md'
          onClick={clearImport}>
          Clear All
        </button>
      </div>
  )
}

export default Header
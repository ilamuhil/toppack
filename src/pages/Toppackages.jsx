// src/components/TopPackages.js
import Header from '../components/Header'

const TopPackages = () => {
  const importedPackages =
    JSON.parse(localStorage.getItem('importedPackages')) || []
  const sortedPackages = importedPackages.sort((a, b) =>
    a.count <= b.count ? 1 : -1
  ).slice(0,10)

  return (
    <div className='p-4'>
      <Header headerText='Packages' linkText='Search Package' linkPath='/' />
      <ul className='border rounded bg-gray-100 my-4 p-4'>
        {sortedPackages?.length ? (
          sortedPackages.map(({ name, count }) => (
            <li key={name} className='mb-2'>
              <span className='font-bold'>{name}</span> - Found in{' '}
              <b>{count}</b> repositor{count > 1 ? 'ies' : 'y'}
            </li>
          ))
        ) : (
          <i className='text-slate-400 inline-flex my-4'>
            No packages have been imported...
          </i>
        )}
      </ul>
    </div>
  )
}

export default TopPackages

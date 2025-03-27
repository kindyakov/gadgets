import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useBreadcrumbStore } from '../../store/useBreadcrumbStore'

const Breadcrumbs = () => {
  const location = useLocation()
  const { breadcrumbNames } = useBreadcrumbStore()
  const pathnames = location.pathname.split('/').filter((x) => x)

  if (!pathnames.length) {
    return ''
  }

  return (
    <nav aria-label="breadcrumb" className='py-3'>
      <ul className='flex flex-wrap'>
        <li>
          <Link to="/" className='text-[#a1abb9]'>Главная</Link>
        </li>
        {pathnames.map((value, index) => {
          // Восстанавливаем путь до текущего сегмента
          const to = `/${pathnames.slice(0, index + 1).join('/')}`
          const isLast = index === pathnames.length - 1
          const displayName = breadcrumbNames[value] || value
          return (
            <li key={to}>
              <span className='mx-2'>/</span>
              {isLast ? (
                // Если последний, делаем его обычным текстом
                <span className='text-[#0f1113]'>{displayName}</span>
              ) : (
                // Иначе - ссылкой
                <Link to={to} className='text-[#a1abb9] hover:text-red-light transition-colors'>{displayName}</Link>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Breadcrumbs

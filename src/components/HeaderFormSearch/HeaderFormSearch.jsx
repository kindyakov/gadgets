import { useSearch } from '../../hooks/useSearch'
import { useHeaderStore } from '../../store/useHeaderStore'
import { SearchSvg } from '../../ui/svg/SearchSvg'
import { useRef, useEffect, useState } from 'react'

const HeaderFormSearch = () => {
  const { mutateAsync, isPending } = useSearch()
  const { setIsSearchOpen, searchResult, setSearchResult } = useHeaderStore()
  const [isFocusInput, setIsFocusInput] = useState(false)
  const [query, setQuery] = useState('')

  const formRef = useRef(null)
  const timerRef = useRef(null)

  const handleSubmitForm = async (value) => {
    try {
      const response = await mutateAsync({ q: value });
      setSearchResult(response)
    } catch (error) {
      console.log(error);
    }
  }

  const debouncedLog = (value) => {
    if (value === '') return
    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(() => handleSubmitForm(value), 400)
  }

  const handleChangeInput = (e) => {
    const { value } = e.target
    setQuery(value)
    debouncedLog(value)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        formRef.current &&
        !formRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setIsSearchOpen])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <form
      ref={formRef}
      className='header__form flex-auto relative'
      onFocus={() => setIsSearchOpen(true)}
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmitForm(query)
      }}
    >
      <button type='submit' className='header__search-button absolute left-4 top-1/2 -translate-y-1/2'>
        <SearchSvg />
      </button>
      <input
        type="search"
        name="search"
        className='header__search-input w-full h-full px-4 rounded-r-md transition-colors min-h-[50px]'
        placeholder='Поиск товаров'
        autoComplete='off'
        value={query}
        onChange={handleChangeInput}
        onFocus={() => setIsFocusInput(true)}
        onBlur={() => setIsFocusInput(false)}
      />
      {isFocusInput && (
        <ul className="absolute top-full left-0 w-full bg-white shadow-lg p-3 rounded-lg flex flex-col mt-1 border-[#e7e7e7] border">

        </ul>
      )}
    </form>
  )
}

export default HeaderFormSearch
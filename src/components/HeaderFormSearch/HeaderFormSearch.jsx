import { SearchSvg } from '../../ui/svg/SearchSvg'

const HeaderFormSearch = () => {
  return (
    <form className='header__form flex-auto relative'>
      <button type='submit' className='header__search-button absolute left-4 top-1/2 -translate-y-1/2'>
        <SearchSvg />
      </button>
      <input
        type="search"
        name="search"
        className='header__search-input w-full h-full px-4 rounded-r-md transition-colors min-h-[50px]'
        placeholder='Поиск товаров'
        autoComplete='off'
        onChange={(e) => console.log(e.target.value)}
      />
    </form>
  )
}

export default HeaderFormSearch
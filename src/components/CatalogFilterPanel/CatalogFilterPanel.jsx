import { useState, useMemo } from 'react'
import { ArrowSvg } from '../../ui/svg/ArrowSvg'
import { SearchSvg } from '../../ui/svg/SearchSvg'
import { CheckSvg } from '../../ui/svg/CheckSvg'
import { CloseSvg } from '../../ui/svg/CloseSvg'

const CatalogFilterPanel = ({ title = '', name = '', items = [], selectedValues = [], isSearch = true, isOpen = true,
  onSelected = () => { } }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLocalOpen, setIsLocalOpen] = useState(isOpen);

  const sortItems = (item) => {
    const index = items.indexOf(item);
    if (index !== -1) {
      const [findItem] = items.splice(index, 1);
      items.unshift(findItem);
    }
  }

  const handleCheckboxChange = (item) => {
    const isSelected = selectedValues.includes(item);

    if (isSelected) {
      selectedValues = selectedValues.filter(_item => _item !== item);

    } else {
      selectedValues = [...selectedValues, item]
      sortItems(item);
    }

    onSelected({ values: selectedValues, name });
  };

  const filteredBySearch = useMemo(() => {
    selectedValues.length && selectedValues.forEach(item => sortItems(item)) // Сортировка выбранных значений в начало списка

    const searchText = searchTerm.toLowerCase().trim();
    if (searchText === '') {
      return items;
    }
    return items.filter(item =>
      item.toLowerCase().includes(searchText)
    );
  }, [items, searchTerm]);

  return (
    <div className='p-3 bg-[#f5f9fd] rounded-lg shadow-sm'>
      <button className='flex items-center justify-between gap-3 w-full'
        onClick={() => setIsLocalOpen(prev => !prev)}
      >
        <p className='relative'>
          {title}
          {!!selectedValues.length ? (<span className='absolute left-full top-0 right-0 text-xs rounded-[50%] text-white text-center align-middle w-4 h-4 bg-red-light translate-x-1'>{selectedValues.length}</span>) : ''}
        </p>
        {selectedValues.length ? (
          <span
            className='text-xs text-gray ml-auto hover:text-red-light'
            onClick={() => {
              onSelected({ values: [], name });
              setIsLocalOpen(prev => !prev)
            }}>
            Очистить
          </span>
        ) : ''}
        <ArrowSvg className={`stroke transition-transform duration-200 ${isLocalOpen ? '-rotate-90' : 'rotate-90'}`} />
      </button>

      <div
        className='transition-all duration-500 overflow-hidden'
        style={{
          maxHeight: isLocalOpen ? '280px' : '0px',
          opacity: isLocalOpen ? 1 : 0,
          marginTop: isLocalOpen ? '0.75rem' : '0rem'
        }}
      >
        {isSearch && (
          <div className="wp-input">
            <input type="text" name='searchTerm' className='input bg-[#f5f9fd] focus:bg-[#fff]' placeholder="Поиск..." autoComplete='off' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            <SearchSvg className={`w-4 h-4 ${!!searchTerm ? 'hidden' : ''}`} />
            <button className={`absolute w-5 h-5 right-3 top-1/2 items-center justify-center transform -translate-y-1/2 ${!!searchTerm ? 'flex' : 'hidden'}`} onClick={() => setSearchTerm('')}>
              <CloseSvg className='w-full h-full' style={{ inset: 'auto', transform: 'translateY(0)' }} />
            </button>
          </div>
        )}

        <div className='flex flex-col gap-2 mt-5 overflow-y-auto max-h-[214px] scrollbar overscroll-none pr-1'>
          {
            filteredBySearch.length ? (
              filteredBySearch.map((item, index) => (
                <label key={item + index} className='flex items-center gap-2 justify-between cursor-pointer group'>
                  <input type="checkbox" className='checkbox-input' name={name} id={name + index} value={item}
                    checked={selectedValues.includes(item)}
                    onChange={() => handleCheckboxChange(item)} />
                  <label htmlFor={name + index} className='checkbox-label'>
                    <CheckSvg />
                  </label>
                  <span className='flex-auto transition-opacity duration-100 group-hover:opacity-60'>{item}</span>
                  <b className='text-gray-500 text-sm font-medium'></b>
                </label>
              ))
            ) : ''
          }
        </div>
      </div>

    </div>
  )
}

export default CatalogFilterPanel
import { useState, useEffect } from "react"
import { Range, getTrackBackground } from 'react-range';
import { useDebounce } from "../../hooks/useDebounce";

const PriceRange = ({ price, selectedPrice, onChangePrice = () => { } }) => {
  const initialMin = selectedPrice.min ? selectedPrice.min : price.min;
  const initialMax = selectedPrice.max ? selectedPrice.max : price.max;

  const [inputValues, setInputValues] = useState([initialMin, initialMax]);
  const [values, setValues] = useState([initialMin, initialMax]);
  const debouncedValues = useDebounce(values, 1000);

  useEffect(() => {
    let min = price.min
    let max = price.max

    if (selectedPrice.min && selectedPrice.min > price.min) {
      min = selectedPrice.min
    }

    if (selectedPrice.max && selectedPrice.max < price.max) {
      max = selectedPrice.max
    }

    setInputValues([min, max])
    setValues([min, max])
  }, [price])

  useEffect(() => {
    if (selectedPrice.min && selectedPrice.max) {
      // Пропускаем изменение, если значения не изменились
      if (JSON.stringify([selectedPrice.min, selectedPrice.max]) === JSON.stringify(debouncedValues)) {
        return
      }
    } else {
      // Пропускаем изменение, если значения не изменились
      if (JSON.stringify([price.min, price.max]) === JSON.stringify(debouncedValues)) {
        return
      }
    }

    onChangePrice(debouncedValues)
  }, [debouncedValues])

  return (
    <div className="flex flex-col w-full gap-3 p-3 bg-[#f5f9fd] rounded-lg shadow-sm">
      <span>Диапазон цен</span>
      <div className="flex gap-2 mb-2">
        <label className='relative w-1/2'>
          <span className='absolute left-2 top-1/2 transform -translate-y-1/2 text-[15px] text-[#888] font-medium'>От</span>
          <input
            type="number"
            name='min'
            step="1" min={price.min} max={price.max}
            value={inputValues[0] || ''}
            placeholder={price.min}
            onChange={e => {
              const value = +e.target.value
              setInputValues(prev => [value, prev[1]])
              if (value >= price.min && value < values[1]) {
                setValues(prev => [value, prev[1]])
              }
            }}
            className="w-full pl-8 pr-3 py-2 bg-[white] rounded-lg transition-colors border border-white focus:border-red-light"
          />
        </label>
        <label className='relative w-1/2'>
          <span className='absolute left-2 top-1/2 transform -translate-y-1/2 text-[15px] text-[#888] font-medium'>До</span>
          <input
            type="number"
            name='max'
            step="1" min={price.min} max={price.max}
            value={inputValues[1] || ''}
            placeholder={price.max}
            onChange={e => {
              const value = +e.target.value
              setInputValues(prev => [prev[0], value])
              if (value <= price.max && value > values[0]) {
                setValues(prev => [prev[0], value])
              }
            }}
            className="w-full pl-8 pr-3 py-2 bg-[white] rounded-lg transition-colors border border-white focus:border-red-light"
          />
        </label>
      </div>
      <div className="p-4">
        <Range
          label="Выберите значение"
          step={1}
          min={price.min}
          max={price.max}
          values={values}
          onChange={(values) => {
            setInputValues(values)
            setValues(values)
          }}
          renderTrack={({ props, children }) => (
            <div {...props} style={{ ...props.style, }}
              className='h-1 bg-lines rounded-lg'
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div {...props} key={props.key} style={{ ...props.style, }}
              className='w-[30px] h-[30px] bg-red-light rounded-full'
            />
          )}
        />
      </div>
    </div>
  )
}

export default PriceRange
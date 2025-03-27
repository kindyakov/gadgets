import { useState } from 'react';
import { Range } from 'react-range';

const Slider = ({ values, step = 1, min = 0, max = 100, ...moreOpts }) => {
  const [localValues, setValues] = useState(values);

  return (
    <Range
      label="Выберите значение"
      step={step}
      min={min}
      max={max}
      values={localValues}
      onChange={(values) => setValues(values)}
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
      {...moreOpts}
    />
  );
};

export default Slider;

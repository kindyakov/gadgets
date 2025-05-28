import { useState, useEffect, useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { FaMapMarkerAlt } from "react-icons/fa";
import { AddressSuggestions } from 'react-dadata';

import Button from '../../ui/Button'

const DeliveryDoor = ({ setDeliveryData, defaultValues }) => {
  const { register, handleSubmit, reset, watch, formState: { errors, isValid }
  } = useForm({ mode: 'onChange' });
  // const [address, setAddress] = useState();

  const values = watch();
  const fields = useMemo(() => ['city', 'street', 'house', 'entrance', 'floor', 'apartment', 'comment'], []);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const saveValidFields = useCallback(() => {
    let hasValidData = false;
    const validData = {};

    fields.forEach(field => {
      if (values[field] !== undefined && !errors[field]) {
        validData[field] = values[field];
        hasValidData = true;
      }
    });

    // Отправляем данные только если есть валидные поля
    if (hasValidData) {
      setDeliveryData(validData);
    }
  }, [values, errors, setDeliveryData, fields]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveValidFields();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [saveValidFields]);

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        console.log('Coordinates:', latitude, longitude);
        // Здесь можно будет подгрузить адрес по координатам через API
      });
    } else {
      alert('Геолокация не поддерживается в вашем браузере');
    }
  };

  const hasValue = (name) => !!watch(name);

  const placeholder = (id, text) => {
    return (
      <label
        htmlFor={id}
        className={`absolute transition-all text-gray-500 pointer-events-none text-[#9FA9B4] 
            ${hasValue(id) || errors[id] ? '-top-4 text-xs left-0' : 'top-2 left-3'} peer-focus:-top-4 peer-focus:left-0 peer-focus:text-xs`
        }
      >
        {text} {errors[id] ? <span className='text-red-light'>({errors[id].message})</span> : ''}
      </label>
    )
  }

  return (
    <form className="mt-5 flex flex-col gap-y-5">
      <button type="button" className="text-red-light absolute top-full left-1 select-none pointer-events-none hover:underline text-left" onClick={handleDetectLocation}>
        Определить местоположение
      </button>
      {/* <AddressSuggestions
        token="e0240461f302fd88ea32bbec29a79b27d8100ee7"
        value={address}
        onChange={setAddress}
        delay={300}
        minChars={3}
      /> */}

      <div className="flex gap-3">
        <div className="wp-input relative flex-1">
          <input
            id='city'
            type="text"
            className={`input peer blue ${errors.city ? 'error' : ''}`}
            autoComplete='off'
            {...register('city', { required: 'обязателен' })}
          />
          {placeholder('city', 'Город')}
        </div>

        <Button type='button' className='py-[4px]'>
          <FaMapMarkerAlt />
          <span>На карте</span>
        </Button>
      </div>

      <div className="wp-input relative">
        <input
          id='street'
          type="text"
          className={`input peer ${errors.street ? 'error' : ''}`}
          autoComplete='off'
          {...register('street', { required: 'обязательна' })}
        />
        {placeholder('street', 'Улица')}
      </div>

      <div className="flex gap-3">
        <div className="wp-input relative w-1/4">
          <input
            id='house'
            type="text"
            className={`input peer ${errors.house ? 'error' : ''}`}
            autoComplete='off'
            {...register('house', { required: 'обязателен' })}
          />
          {placeholder('house', 'Дом')}
        </div>
        <div className="wp-input relative w-1/4">
          <input
            id='entrance'
            type="text"
            className={`input peer ${errors.entrance ? 'error' : ''}`}
            autoComplete='off'
            inputMode='numeric'
            {...register('entrance', { pattern: { value: /^[0-9]+$/, message: 'только цифры' } })}
          />
          {placeholder('entrance', 'Подъезд')}
        </div>
        <div className="wp-input relative w-1/4">
          <input
            id='floor'
            type="text"
            className={`input peer ${errors.floor ? 'error' : ''}`}
            autoComplete='off'
            inputMode='numeric'
            {...register('floor', { pattern: { value: /^[0-9]+$/, message: 'только цифры' } })}
          />
          {placeholder('floor', 'Этаж')}
        </div>

        <div className="wp-input relative w-1/4">
          <input
            id='apartment'
            type="text"
            className={`input peer ${errors.apartment ? 'error' : ''}`}
            autoComplete='off'
            {...register('apartment', { pattern: { value: /^[0-9]+$/, message: 'Только цифры' } })}
          />
          {placeholder('apartment', 'Квартира / офис')}
        </div>
      </div>

      <div className="wp-input relative">
        <textarea
          id='comment'
          type="text"
          name="comment peer"
          className={`input peer resize-none min-h-24 ${errors.comment ? 'error' : ''}`}
          autoComplete='off'
          {...register('comment', { maxLength: { value: 200, message: 'Не более 200 символов' } })}
        ></textarea>
        {placeholder('comment', 'Комментарий к доставке')}
      </div>

      <button>'asdasd</button>
    </form>
  )
}

export default DeliveryDoor
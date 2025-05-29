// import 'react-dadata/dist/react-dadata.css';
import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FaMapMarkerAlt } from "react-icons/fa";
// import { AddressSuggestions } from 'react-dadata';
import Button from '../../ui/Button'
import Placeholder from '../../ui/Placeholder';
import { useDoorData, useUpdateDeliveryData } from '../../store/useDeliveryStore';

const DeliveryDoor = ({ order }) => {
  const deliveryDoorData = useDoorData();
  const updateDeliveryData = useUpdateDeliveryData();
  const defaultValues = useMemo(() => ({ ...order.delivery.data.door, ...deliveryDoorData }), [order, deliveryDoorData])

  const { register, handleSubmit, reset, watch, formState: { errors, isValid }
  } = useForm({ defaultValues: order.delivery.data.door, mode: 'onChange' });

  // const [address, setAddress] = useState();

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = (data) => {
    updateDeliveryData('door', data)
  }

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
  }


  return (
    <form className="mt-6 flex flex-col gap-y-5" onSubmit={handleSubmit(onSubmit)}>
      {/* <button type="button" className="text-red-light select-none hover:underline text-left" onClick={handleDetectLocation}>
        Определить местоположение
      </button> */}
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
          <Placeholder id='city' watch={watch} errors={errors}>Город</Placeholder>
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
        <Placeholder id='street' watch={watch} errors={errors}>Улица</Placeholder>
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
          <Placeholder id='house' watch={watch} errors={errors}>Дом</Placeholder>
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
          <Placeholder id='entrance' watch={watch} errors={errors}>Подъезд</Placeholder>
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
          <Placeholder id='floor' watch={watch} errors={errors}>Этаж</Placeholder>
        </div>

        <div className="wp-input relative w-1/4">
          <input
            id='apartment'
            type="text"
            className={`input peer ${errors.apartment ? 'error' : ''}`}
            autoComplete='off'
            {...register('apartment', { pattern: { value: /^[0-9]+$/, message: 'Только цифры' } })}
          />
          <Placeholder id='apartment' watch={watch} errors={errors}>Квартира / офис</Placeholder>
        </div>
      </div>

      <div className="wp-input relative">
        <textarea
          id='comment'
          type="text"
          name="comment"
          className={`input peer resize-none min-h-24 ${errors.comment ? 'error' : ''}`}
          autoComplete='off'
          {...register('comment', { maxLength: { value: 200, message: 'Не более 200 символов' } })}
        ></textarea>
        <Placeholder id='comment' watch={watch} errors={errors}>Комментарий к доставке</Placeholder>
      </div>

      <Button disabled={!isValid} className='ml-auto'>Перейти к выбору оплаты</Button>
    </form>
  )
}

export default DeliveryDoor
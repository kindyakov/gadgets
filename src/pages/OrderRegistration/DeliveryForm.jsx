import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

const DeliveryForm = () => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const [deliveryType, setDeliveryType] = useState('door');

  const onSubmit = data => {
    console.log('Delivery data:', data);
  };

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

  useEffect(() => {
    register('deliveryType');
    setValue('deliveryType', deliveryType);
  }, [deliveryType]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-4">
      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="door"
            className='radio'
            checked={deliveryType === 'door'}
            onChange={() => setDeliveryType('door')}
          />
          <span>Доставка до двери</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="pickup"
            className='radio'
            checked={deliveryType === 'pickup'}
            onChange={() => setDeliveryType('pickup')}
          />
          <span>Пункт выдачи (Boxberry, СДЭК, Почта)</span>
        </label>
      </div>

      {deliveryType === 'door' ? (
        <>
          <div className="wp-input">
            <input
              type="text"
              placeholder="Город"
              className="input"
              autoComplete='off'
              {...register('city')}
            />
          </div>

          <div className="wp-input">
            <input
              type="text"
              placeholder="Улица"
              className="input"
              autoComplete='off'
              {...register('street')}
            />
          </div>

          <div className="flex gap-4">
            <div className="wp-input w-1/3">
              <input
                type="text"
                placeholder="Дом"
                className="input"
                autoComplete='off'
                {...register('house')}
              />
            </div>
            <div className="wp-input w-1/3">
              <input
                type="text"
                placeholder="Подъезд"
                className="input"
                autoComplete='off'
                inputMode='numeric'
                {...register('entrance')}
              />
            </div>
            <div className="wp-input w-1/3">
              <input
                type="text"
                placeholder="Этаж"
                className="input"
                autoComplete='off'
                inputMode='numeric'
                {...register('floor')}
              />
            </div>
          </div>

          <div className="wp-input">
            <input
              type="text"
              placeholder="Квартира / офис"
              className="input"
              autoComplete='off'
              {...register('apartment')}
            />
          </div>
        </>
      ) : ''}

      <div className="wp-input">
        <textarea
          type="text"
          name="comment"
          className="input resize-none min-h-24"
          autoComplete='off'
          placeholder="Комментарий к доставке (необязательно)"
          {...register('comment')}
        ></textarea>
      </div>

      <button type="button" className="text-red-light hover:underline text-left" onClick={handleDetectLocation}>
        Определить местоположение
      </button>
    </form>
  );
};

export default DeliveryForm;

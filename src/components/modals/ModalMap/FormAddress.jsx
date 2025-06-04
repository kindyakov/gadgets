import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDeliveryStore } from '../../../store/useDeliveryStore';
import { useModalStore } from '../../../store/useModalStore';
import Placeholder from '../../../ui/Placeholder';
import Button from '../../../ui/Button';

const FormAddress = ({ addressObj }) => {
  const { register, handleSubmit, reset, watch, formState: { errors, isValid }
  } = useForm({ defaultValues: addressObj, mode: 'onChange' });
  const updateData = useDeliveryStore(state => state.updateData);
  const closeModal = useModalStore(state => state.closeModal)

  const onSubmit = (data) => {
    updateData('door', data)
    closeModal('modalMap')
  }

  useEffect(() => {
    reset(addressObj);
  }, [addressObj, reset]);

  return (
    <form className="w-2/6 flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-xl font-verdana">Адрес доставки:</h3>

      <div className="wp-input relative">
        <input
          id='city'
          type="text"
          className={`input text-[14px]  peer blue ${errors.city ? 'error' : ''}`}
          autoComplete='off'
          {...register('city', { required: 'обязателен' })}
        />
        <Placeholder id='city' watch={watch} errors={errors}>Город</Placeholder>
      </div>


      <div className="wp-input relative">
        <input
          id='street'
          type="text"
          className={`input text-[14px]  peer ${errors.street ? 'error' : ''}`}
          autoComplete='off'
          {...register('street', { required: 'обязательна' })}
        />
        <Placeholder id='street' watch={watch} errors={errors}>Улица</Placeholder>
      </div>

      <div className="wp-input relative">
        <input
          id='house'
          type="text"
          className={`input text-[14px]  peer ${errors.house ? 'error' : ''}`}
          autoComplete='off'
          {...register('house', { required: 'обязателен' })}
        />
        <Placeholder id='house' watch={watch} errors={errors}>Дом</Placeholder>
      </div>
      <div className="wp-input relative">
        <input
          id='entrance'
          type="text"
          className={`input text-[14px]  peer ${errors.entrance ? 'error' : ''}`}
          autoComplete='off'
          inputMode='numeric'
          {...register('entrance', { pattern: { value: /^[0-9]+$/, message: 'только цифры' } })}
        />
        <Placeholder id='entrance' watch={watch} errors={errors}>Подъезд</Placeholder>
      </div>
      <div className="wp-input relative ">
        <input
          id='floor'
          type="text"
          className={`input text-[14px]  peer ${errors.floor ? 'error' : ''}`}
          autoComplete='off'
          inputMode='numeric'
          {...register('floor', { pattern: { value: /^[0-9]+$/, message: 'только цифры' } })}
        />
        <Placeholder id='floor' watch={watch} errors={errors}>Этаж</Placeholder>
      </div>

      <div className="wp-input relative ">
        <input
          id='apartment'
          type="text"
          className={`input text-[14px]  peer ${errors.apartment ? 'error' : ''}`}
          autoComplete='off'
          {...register('apartment', { pattern: { value: /^[0-9]+$/, message: 'Только цифры' } })}
        />
        <Placeholder id='apartment' watch={watch} errors={errors}>Квартира / офис</Placeholder>
      </div>

      <Button className='mt-auto' disabled={!isValid}>Сохранить</Button>
    </form>
  )
}

export default FormAddress
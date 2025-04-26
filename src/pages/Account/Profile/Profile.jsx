import styles from './profile.module.scss'
import { useState } from 'react'
import Select from 'react-select';
import { useForm } from "react-hook-form"
import { useUserStore } from '../../../store/useUserStore'
import { formatDate } from '../../../utils/formattedDate';
import Button from '../../../ui/Button'

const Profile = () => {
  const [isDisabled, setIsDisabled] = useState(true)
  const { user } = useUserStore()
  const options = [
    { value: 'male', label: 'Мужской' },
    { value: 'female', label: 'Женский' },
  ]
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)

  return (
    <form
      className='flex items-start w-full h-full gap-3 p-5'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-1/4 flex items-center justify-center">
        <img src={user.photo} alt={user.name} className='max-w-full max-h-full object-contain' />
      </div>
      <div className="flex flex-col gap-3 w-3/4">
        <div className="grid grid-cols-2 gap-3">
          <div className="wp-input relative flex flex-col gap-1">
            <span className='text-[#999999] text-sm'>Имя</span>
            <input className="input py-3" placeholder="Имя" name="name"
              value={user?.name}
              disabled={isDisabled}
              {...register("name", { required: true, minLength: 2 })}
            />
            {errors.name && (
              <span className="text-red-light text-xs absolute top-0 right-1 select-none pointer-events-none">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="wp-input relative">
            <span className='text-[#999999] text-sm'>Фамилия</span>
            <input className="input py-3" placeholder="Фамилия" name="surname"
              value={user?.surname}
              disabled={isDisabled}
              {...register("surname", { required: true, minLength: 2 })}
            />
          </div>
          <div className="wp-input relative">
            <span className='text-[#999999] text-sm'>Телефон</span>
            <input className="input py-3" inputMode="tel" placeholder="Телефон" name="phone"
              value={user?.phone}
              disabled={isDisabled}
              {...register("phone", { required: true })}
            />
          </div>
          <div className="wp-input relative">
            <span className='text-[#999999] text-sm'>Почта</span>
            <input className="input py-3" placeholder="Почта" name="email"
              value={user?.email}
              disabled={isDisabled}
              {...register("email", { required: true })}
            />
          </div>
          <div className="wp-input relative">
            <span className='text-[#999999] text-sm'>Дата рождения</span>
            <input className="input py-3" placeholder="Дата рождения" name="birthday"
              value={formatDate(user?.birthday, 'DD.MM.YYYY')}
              disabled={isDisabled}
              {...register("birthday", { required: true })}
            />
          </div>
          <div className="wp-input relative">
            <span className='text-[#999999] text-sm'>Пол</span>
            <Select
              defaultValue={options.find(o => o.value === user?.gender)}
              onChange={() => { }}
              options={options}
              isSearchable={false}
              isDisabled={isDisabled}
              className={styles.select}
            />
          </div>
        </div>

        <Button className='w-fit mx-auto' disabled={isDisabled}>Сохранить</Button>
      </div>
    </form>
  )
}

export default Profile
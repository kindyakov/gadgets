import { useForm, Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { useEffect } from "react";

const FormContactInformation = ({ user }) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name || '',
      surname: user.surname || '',
      phone: user.phone || ''
    }
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user?.name || '',
        surname: user?.surname || '',
        phone: user?.phone || '',
      });
    }
  }, [user, reset]);

  const spanError = (key) => {
    return errors[key] && (
      <span className="text-red-light text-xs absolute top-0 right-1 select-none pointer-events-none">
        {errors[key].message}
      </span>
    )
  }

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <form className='grid gap-4 grid-cols-3 mt-4' onSubmit={handleSubmit(onSubmit)}>
      <div className="wp-input">
        <span className="text-sm text-gray/70">Имя</span>
        <input type="text" name='name' className='input'
          {...register("name", {
            required: 'Введите имя',
            minLength: { value: 2, message: 'Минимум 2 символов' },
          })}
        />
        {spanError('name')}
      </div>
      <div className="wp-input">
        <span className="text-sm text-gray/70">Фамилия</span>
        <input type="text" name='surname' className='input'
          {...register("surname", {
            required: 'Введите фамилию',
            minLength: { value: 2, message: 'Минимум 2 символов' },
          })}
        />
        {spanError('surname')}
      </div>
      <div className="wp-input relative">
        <span className="text-sm text-gray/70">Телефон</span>
        <Controller
          name="phone"
          control={control}
          rules={{
            required: 'Введите телефон',
            pattern: {
              value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
              message: 'Неверный формат телефона',
            }
          }}
          render={({ field: { ref, ...field } }) => (
            <IMaskInput
              mask="+7 (000) 000-00-00"
              className="input"
              inputMode="tel"
              inputRef={(el) => {
                if (el && el.input) {
                  ref(el.input);
                }
              }}
              {...field}
            />
          )}
        />
        {spanError('phone')}
      </div>

    </form >
  )
}

export default FormContactInformation
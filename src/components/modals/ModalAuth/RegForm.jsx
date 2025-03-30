import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";
import toast from 'react-hot-toast';
import { useRegister } from "../../../hooks/useRegister"
import Button from "../../../ui/Button";

const RegForm = ({ closeModal }) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate, isPending, isSuccess, error, data } = useRegister()

  const onSubmit = (data) => {
    data.phone = data.phone.replace(/\D/g, '')
    mutate(data);
  };

  useEffect(() => {
    if (data && isSuccess) {
      const { status, message } = data;

      if (status === "success") {
        reset()
        closeModal()
      }

      toast[status](message, { duration: 4000, })
    }
  }, [data, isSuccess]);

  const password = watch("password");

  return (
    <form className="flex flex-col gap-4 mt-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="wp-input relative">
        <input type="text" name="name" className="input py-3" placeholder="Имя"
          {...register("name", {
            required: 'Введите имя',
            pattern: {
              value: /^[^\s]+$/,
              message: 'Имя не должно содержать пробелы',
            },
            minLength: { value: 2, message: 'Минимум 2 символа' },
            maxLength: { value: 30, message: 'Максимум 30 символов' },
          })} />
        {errors.name && (
          <span className="text-red-light text-xs absolute top-0 right-1 select-none pointer-events-none">
            {errors.name.message}
          </span>
        )}
      </div>
      <div className="wp-input relative">
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
              className="input py-3"
              inputMode="tel"
              placeholder="Телефона"
              inputRef={(el) => {
                if (el && el.input) {
                  ref(el.input);
                }
              }}
              {...field}
            />
          )}
        />
        {errors.phone && (
          <span className="text-red-light text-xs absolute top-0 right-1 select-none pointer-events-none">
            {errors.phone.message}
          </span>
        )}
      </div>
      <div className="wp-input relative">
        <input type="password" name="password" className="input py-3" placeholder="Пароль"
          {...register("password", {
            required: 'Введите пароль',
            minLength: { value: 6, message: 'Минимум 6 символов' },
          })}
        />
        {errors.password && (
          <span className="text-red-light text-xs absolute top-0 right-1 select-none pointer-events-none">
            {errors.password.message}
          </span>
        )}
      </div>
      <div className="wp-input relative">
        <input type="password" name="re-password" className="input py-3" placeholder="Повторите пароль"
          {...register("rePassword", {
            required: 'Повторите пароль',
            validate: value => value === password || 'Пароли не совпадают',
          })}
        />
        {errors.rePassword && (
          <span className="text-red-light text-xs absolute top-0 right-1 select-none pointer-events-none">
            {errors.rePassword.message}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between gap-4">
        <Button
          type="submit"
          className="mx-auto"
          isLoader={true}
          isLoading={isPending}
          disabled={isPending}
        >
          Зарегистрироваться
        </Button>
      </div>
    </form>
  )
}

export default RegForm
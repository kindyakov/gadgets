import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";
import toast from 'react-hot-toast';
import { useAuth } from "../../../hooks/useAuth";
import Button from "../../../ui/Button";

const AuthForm = ({ setFormName, closeModal }) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate, isPending, isSuccess, error, data } = useAuth()

  const onSubmit = (data) => {
    data.phone = data.phone.replace(/\D/g, '')
    mutate(data)
  };

  useEffect(() => {
    if (data && isSuccess) {
      const { status, message } = data

      if (status === 'success') {
        reset()
        closeModal()
      }

      toast[status](message, { duration: 3000, })
    }
  }, [data])

  return (
    <form className="flex flex-col gap-4 mt-5" onSubmit={handleSubmit(onSubmit)}>
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
        <input
          type="password"
          className="input py-3"
          placeholder="Пароль"
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

      <div className="flex items-center justify-between gap-4">
        <Button type="submit" isLoader={true} isLoading={isPending} disabled={isPending}>
          Войти
        </Button>
        <button
          type="button"
          className="text-sm text-[#263141] transition-colors hover:text-red-light"
          onClick={() => setFormName('recPass')}
        >
          Восстановить пароль
        </button>
      </div>
    </form>
  );
};

export default AuthForm;

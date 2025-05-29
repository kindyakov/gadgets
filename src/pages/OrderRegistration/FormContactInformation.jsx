import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { useEffect } from "react";
import Button from "../../ui/Button";
import Placeholder from "../../ui/Placeholder";

const FormContactInformation = ({ user }) => {
  const formattedPhone = useMemo(() => {
    if (!user.phone) return ''
    const digits = user.phone.replace(/\D/g, '');
    const match = digits.match(/^7?(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (!match) return '';
    const [, a, b, c, d] = match;
    return `+7 (${a}) ${b}-${c}-${d}`;
  }, [user.phone]);

  const defaultValues = useMemo(() => ({
    name: user.name || '',
    surname: user.surname || '',
    phone: formattedPhone
  }), [user]);

  const { control, register, handleSubmit, watch, reset, formState: { errors, isValid } } = useForm({ defaultValues });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <form className='flex flex-col gap-4 mt-5' onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 grid-cols-3">
        <div className="wp-input relative">
          <input id="name" type="text"
            className={`input peer ${errors.name ? 'error' : ''}`}
            {...register("name", {
              required: 'обязательно',
              minLength: { value: 2, message: 'минимум 2 символа' },
            })}
          />
          <Placeholder id='name' watch={watch} errors={errors}>Имя</Placeholder>
        </div>
        <div className="wp-input relative">
          <input id="surname" type="text"
            className={`input peer ${errors.surname ? 'error' : ''}`}
            {...register("surname", {
              required: 'обязательно',
              minLength: { value: 2, message: 'минимум 2 символа' },
            })}
          />
          <Placeholder id='surname' watch={watch} errors={errors}>Фамилия</Placeholder>
        </div>
        <div className="wp-input relative">
          <Controller
            name="phone"
            control={control}
            rules={{
              required: 'обязателен',
              pattern: {
                value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                message: 'неверный формат',
              }
            }}
            render={({ field: { ref, ...field } }) => (
              <IMaskInput
                id="phone"
                mask="+7 (000) 000-00-00"
                className={`input peer ${errors.phone ? 'error' : ''}`}
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
          <Placeholder id='phone' watch={watch} errors={errors}>Телефон</Placeholder>
        </div>
      </div>
      <Button className="ml-auto" disabled={!isValid}>Перейти к выбору доставки</Button>
    </form >
  )
}

export default FormContactInformation
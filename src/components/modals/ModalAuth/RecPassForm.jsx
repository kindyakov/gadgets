import React from 'react'

const RecPassForm = () => {
  return (
    <form className="flex flex-col gap-4 mt-5">
      <div className="wp-input">
        <input type="tel" name="phone" className="input py-3" inputMode="tel" placeholder="Телефона" />
      </div>
      <div className="wp-input">
        <input type="number" name="code" className="input py-3" inputMode="numeric" placeholder="Код"
          readOnly={true} />
      </div>
      <div className="wp-input">
        <input type="password" name="password" className="input py-3" placeholder="Пароль"
          disabled={true} />
      </div>
      <div className="wp-input">
        <input type="password" name="re-password" className="input py-3" placeholder="Повторите пароль"
          disabled={true} />
      </div>

      <div className="flex items-center justify-between gap-4">
        <button type="submit" className="button py-3 mx-auto">Отправить телефон</button>
      </div>
    </form>
  )
}

export default RecPassForm;


import { useState, useEffect } from "react"
import BaseModal from "../BaseModal"
import { useModalStore } from "../../../store/useModalStore"

import AuthForm from "./AuthForm"
import RegForm from "./RegForm"
import RecPassForm from "./RecPassForm"

import { YandexSvg } from "../../../ui/svg/YandexSvg"
import { LogoVkSvg } from "../../../ui/svg/LogoVkSvg"

const ModalAuth = () => {
  const [formName, setFormName] = useState('auth')
  const { closeModal, getModal } = useModalStore()

  const modal = getModal('modalAuth')

  const forms = {
    auth: (props) => <AuthForm {...props} />,
    reg: (props) => <RegForm {...props} />,
    recPass: (props) => <RecPassForm {...props} />,
  }

  const FormComponent = forms[formName] || 'неизвестный формат'

  useEffect(() => {
    if (!modal?.isOpen) {
      setFormName('auth')
    }
  }, [modal?.isOpen, setFormName]);

  return (
    <BaseModal title='Авторизация' isOpen={modal?.isOpen} onRequestClose={() => closeModal('modalAuth')}>
      <div className="flex flex-col h-full w-full">
        <h3 className="text-center text-xl font-medium">Личный кабинет</h3>
        <FormComponent setFormName={setFormName} closeModal={() => closeModal('modalAuth')} />

        <div className="flex flex-col items-center gap-2 mt-3">
          <p className="text-base text-[#656666]">Войти с помощью</p>
          <div className="flex flex-wrap gap-2">
            <a href=""
              className="w-9 h-9 rounded-full flex items-center justify-center p-1 duration-300 transition-colors hover:bg-[#E92100]">
              <YandexSvg />
            </a>
            <a href=""
              className="w-9 h-9 rounded-full flex items-center justify-center p-1 duration-300 transition-colors hover:bg-[#0077FF]">
              <LogoVkSvg className='w-full h-full' />
            </a>
          </div>
        </div>

        <button
          className="text-sm text-[#263141] transition-colors hover:text-red-light mt-3 w-fit mx-auto"
          onClick={() => setFormName(prev => prev === 'auth' ? 'reg' : 'auth')}>
          {formName === 'auth' ? 'Зарегистрироваться' : 'Ещё не авторизованы?'}
        </button>
      </div>
    </BaseModal>
  )
}

export default ModalAuth
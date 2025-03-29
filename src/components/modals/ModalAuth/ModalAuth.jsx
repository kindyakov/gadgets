import BaseModal from "../BaseModal"
import { useModalStore } from "../../../store/useModalStore"

const ModalAuth = () => {
  const { closeModal, getModal } = useModalStore()
  const modal = getModal('modalAuth')

  return (
    <BaseModal title='Авторизация' isOpen={modal?.isOpen} onRequestClose={() => closeModal('modalAuth')}>
      <div>Модальное окно</div>
    </BaseModal>
  )
}

export default ModalAuth
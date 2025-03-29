import { useEffect } from 'react';
import { useModalStore } from './store/useModalStore';
import ModalAuth from './components/modals/ModalAuth/ModalAuth';

const InitialModals = () => {
  const addModal = useModalStore(state => state.addModal);

  useEffect(() => {
    addModal('modalAuth', { isOpen: false });
  }, [addModal]);

  return (
    <>
      <ModalAuth />
    </>
  );
};

export default InitialModals;

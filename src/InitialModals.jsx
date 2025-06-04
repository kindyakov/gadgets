import { useEffect } from 'react';
import { useModalStore } from './store/useModalStore';
import ModalAuth from './components/modals/ModalAuth/ModalAuth';
import ModalMap from './components/modals/ModalMap/ModalMap';

const InitialModals = () => {
  const { addModal, modals } = useModalStore();

  useEffect(() => {
    addModal('modalAuth', { isOpen: false });
    addModal('modalMap', { isOpen: false });
  }, [addModal]);

  useEffect(() => {
    Object.entries(modals).forEach(([modalId, options]) => {
      if (options.isOpen) {
        const scrollBarWidth = window.innerWidth - document.body.offsetWidth || 0

        document.body.style.paddingRight = `${scrollBarWidth}px`;
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.paddingRight = '';
        document.body.style.overflow = '';
      }
    })
  }, [modals]);

  return (
    <>
      <ModalAuth />
      <ModalMap />
    </>
  );
};

export default InitialModals;

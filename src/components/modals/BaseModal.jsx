import Modal from 'react-modal';

// Для обеспечения доступности обязательно указываем корневой элемент приложения
Modal.setAppElement('#root');

const BaseModal = ({ isOpen, isBtnCLose = true, onRequestClose, title, children, ...props }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className='max-w-[500px] w-full p-5 rounded-xl shadow-md bg-white relative'
      contentLabel={title || 'Modal'}
      {...props}
    >
      {isBtnCLose && <button onClick={onRequestClose} className='absolute top-2 right-2 cursor-pointer text-xl w-7 h-7 transition-colors hover:text-red-light'>✕</button>}
      {children}
    </Modal>
  );
};

export default BaseModal;

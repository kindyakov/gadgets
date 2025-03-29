import Modal from 'react-modal';

// Для обеспечения доступности обязательно указываем корневой элемент приложения
Modal.setAppElement('#root');

const BaseModal = ({ isOpen, onRequestClose, title, children, ...props }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className='top-2/4 left-2/4 translate-x-1/2 translate-y-1/2 max-w-[500px] w-[95%] p-5 rounded-xl shadow-md'
      contentLabel={title || 'Modal'}
      {...props}
    >
      <button onClick={onRequestClose}>Закрыть</button>
      {children}
    </Modal>
  );
};

export default BaseModal;

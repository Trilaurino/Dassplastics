import Modal from '../components/Modal/Modal';
import useModal from '../hooks/useModal';
import React, { createContext } from 'react';

let ModalContext;
let { Provider } = (ModalContext = createContext());

let ModalProvider = ({ children }) => {
	let { modal, handleModal, modalContent } = useModal();
	return (
		<Provider value={{ modal, handleModal, modalContent }}>
			<Modal />
			{children}
		</Provider>
	);
};

export { ModalContext, ModalProvider };

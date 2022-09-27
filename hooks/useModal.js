import React from "react";

const useModal = () => {
    let [modal, setModal] = React.useState(false);
    let [modalContent, setModalContent] = React.useState("I'm the Modal Content");

    let handleModal = (content) => {
        if (content) {
            setModalContent(content);
        }
        setModal(!modal);
    };

    return { modal, handleModal, modalContent };
};
export default useModal;
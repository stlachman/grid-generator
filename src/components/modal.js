import React from "react";
import styled from "@emotion/styled";

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000;
  display: ${({ show }) => (show ? "block" : "none")};
`;

const ModalContent = styled.div`
  position: fixed;
  background-color: #f7fafc;
  box-shadow: 0 6px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.09);
  border-radius: 0.5rem;
  width: 100%;
  top: 50%;
  left: 50%;
  min-height: 100vh;
  padding: 1.5em 2em;
  transform: translate(-50%, -50%);
  @media (min-width: 460px) {
    width: 40%;
    max-height: 100%;
    min-height: 0;
  }
`;

export default function({ show, children, handleClose, setCopyStatus }) {
  const handleClickClose = e => {
    if (e.target.classList.contains("modal-container")) {
      setCopyStatus("");
      handleClose();
    }
  };

  return (
    <ModalContainer
      onClick={handleClickClose}
      show={show}
      className="modal-container"
    >
      <ModalContent>{children}</ModalContent>
    </ModalContainer>
  );
}

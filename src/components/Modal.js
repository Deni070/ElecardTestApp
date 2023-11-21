import React from 'react';
import './Modal.css';

const Modal = ({ imageUrl, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <img src={imageUrl} alt="Full size" />
                <button className="modal-close-btn" onClick={onClose}>
                    Закрыть
                </button>
            </div>
        </div>
    );
};

export default Modal;
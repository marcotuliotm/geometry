import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

import './index.css';

function Modal({ title = '', text = '', onClick }) {
    return (
        <section className="modal">
            <article className="modal__content">
                <div className="modal__body">
                    <button type="button" className="modal__close" onClick={onClick}>&times;</button>

                    <h1 className="modal__title">{title}</h1>
                    <p className="modal__text">{text}</p>
                </div>

                <footer className="modal__footer">
                    <Button text="Close" onClick={onClick} />
                </footer>
            </article>
        </section>
    )
}

Modal.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default Modal;
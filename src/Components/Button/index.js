import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

function Button({ text = '', onClick }) {
    return (
        <button className="button" type="button" onClick={onClick}>{text}</button>
    )
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default Button;
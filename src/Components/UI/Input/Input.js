import React from 'react';
import './Input.css'
import SearchLogo from '../../../assets/search.svg';

const Input = props => {

    return (
        <div className="inputWrapper" >
            <img className="searchSVG" src={ SearchLogo } alt="search" />
            <input
                className="inputArea"
                placeholder="Enter a country Name"
                value={ props.userInput }
                onChange={ props.setInput } />
            <i className="fa fa-close" onClick={ props.clearInput } />
        </div >
    )
};

export default Input;

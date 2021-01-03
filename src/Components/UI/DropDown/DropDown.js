import React from 'react';
import './DropDown.css'

const DropDown = props => {

    return (
        <div className={ "dropdownWrapper open" } >
            <ul className="dropdown" >
                { props.options.map((option, index) =>
                    <li
                        key={ `${ option }-${ index }` } className="dropdown-item"
                        onClick={ props.setSelect } >{ option }</li >
                ) }
            </ul >
        </div >
    )
};

export default DropDown;

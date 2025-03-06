
/**
 * @file Button.jsx
 * @author Brendan Dileo
 */

import "../components/Button.css";

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const Button = ({ label, onClick, className }) => {
    return (
        <button
            className={`mr-4 mb-10 py-3 px-8 font-bold rounded-md cursor-pointer shadow-lg
            button-hover button-click ${className}`}
            onClick={onClick}
        >
        {label}
        </button>
    )
}

export default Button;
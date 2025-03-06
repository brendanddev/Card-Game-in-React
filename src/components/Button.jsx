
// Button.jsx
// Brendan Dileo

import "../components/Button.css";

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

// Export Button component
export default Button;
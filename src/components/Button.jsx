
// Button.jsx
// Brendan Dileo

import "../components/Button.css"


const Button = ({ label, onClick, className }) => {
    return (
        <button className={`btn ${className}`} onClick={onClick}>
            {label}
        </button>
    )
}

// Export Button component
export default Button;
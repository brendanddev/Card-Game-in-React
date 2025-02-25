
// Button.jsx
// Brendan Dileo

import "../components/Button.css"


const Button = ({ label, onClick }) => {
    return (
        <button onClick={onClick}>
            {label}
        </button>
    )
}

// Export Button component
export default Button;
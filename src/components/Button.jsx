
/**
 * @file Button.jsx
 * @author Brendan Dileo
 * 
 * This file contains the Button component.
 * This component will render a button that can be customized with dynamic styling, and an
 * event handler.
*/

import "../components/Button.css";

/**
 * Functional Button Component
 * 
 * This component will take three props indicating what the button will display, which function
 * will be called when the button is clicked, and a CSS class indicating how the button will be 
 * styled. It will render the button component based on the props passed to the component, in 
 * addition to the basic TailwindCSS styles already applied.
 * 
 * @param {Object} param0 - The object containing the components props (properties).

 * @returns 
 */
const Button = ({ label, onClick, className }) => {
    return (
        <button
            // Tailwind css for all buttons, 
            className={`mr-4 mb-10 py-3 px-8 font-bold rounded-md cursor-pointer shadow-lg
            button-hover button-click ${className}`} // Uses a literal to dynamically load class styles specific to the button
            onClick={onClick}
        >
        {/* Text to be displayed in the button */}
        {label}
        </button>
    )
}

export default Button;
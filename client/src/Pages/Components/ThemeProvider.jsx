import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
    const { theme } = useSelector(state => state.theme);

    // Define classes based on the theme
    const themeClasses = theme === 'dark'
        ? {
            background: "bg-gradient-to-r from-teal-700 via-teal-800 to-gray-900",
            text: "text-white",
            buttonBg: "bg-gradient-to-r from-teal-500 to-teal-700 text-white hover:shadow-md", // Updated button styles
            hoverText: "hover:text-teal-400",
            link: "text-teal-400"
          } // Dark theme colors
        : {
            background: "bg-blue-100", // Light theme background
            text: "text-gray-800", // Darker text color for contrast against the blue background
            buttonBg: "bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:shadow-md", // Button styles for light theme
            hoverText: "hover:text-blue-600", // Hover text color for light theme
            link: "text-blue-600" 
          }; // Light theme colors

    return (
        <div className={themeClasses.background}>
            <div className={`${themeClasses.text} transition-colors duration-500 ease-in-out min-h-screen`}>
                {children}
            </div>
        </div>
    );
}

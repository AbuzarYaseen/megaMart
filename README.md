# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# E-Commerce Project

Welcome to our fully functional e-commerce project! This project is built using React with Redux Toolkit for state management. It includes features such as protected routing, proper validation for signin and signup forms, and a polished user interface. Additionally, it utilizes `react-toast` for notifications, `react-headroom` for a dynamic header, and implements data fetching from an API with a loader for a seamless user experience.

## Features

1. **Redux Toolkit Implementation**: State management is handled efficiently through Redux Toolkit, providing a predictable and centralized state for the application.

2. **Protected Routing**: The project includes protected routes to ensure that certain pages are only accessible to authenticated users. This enhances security and controls user access.

3. **Form Validation**:
   - **Sign In Form**: Proper validation is implemented for the sign-in form, ensuring that users provide valid credentials before authentication.
   - **Sign Up Form**: The sign-up form includes validation to verify user input, enhancing the user experience and preventing invalid registrations.

4. **Notifications with `react-toast`**: User notifications are handled using `react-toast` for a clean and user-friendly way to display messages.

5. **Dynamic Header with `react-headroom`**: The header dynamically adjusts as the user scrolls, providing an engaging and responsive UI.

6. **API Data Fetching**: Data is fetched from external APIs, ensuring the latest and most relevant information is displayed.

7. **Loader Implementation**: A loader is integrated to enhance the user experience while waiting for data to load.

## Project Structure

The project structure follows best practices for a scalable and maintainable codebase. Key directories include:
- **src/pages**: Contains various pages, including sign-in, sign-up, and other components.
- **src/features**: Houses Redux slices and other feature-related code.
- **src/components**: Reusable components used throughout the project.
- **src/pages/protectedRoutes**: Defines the project's routing structure, including protected routes.

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the application with `npm run dev`.

Feel free to explore the codebase, and we hope you enjoy using our feature-rich e-commerce project!

Happy coding!

# MiniTaskTracker

This is a simple web application built with Vite and pure TypeScript.

## How to Run the App

To get this application running on your local machine, follow these steps:

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Start the development server:**

    ```bash
    npm run dev
    ```

    Vite will compile the TypeScript files and launch the development server, usually at `http://localhost:5173`. You can then open this URL in your web browser.

    **Optionally:**

    ```bash
    npm run tsc
    ```

    `tsc` is the TypeScript compiler. By default, it looks for a tsconfig.json file in project root to determine how to compile the TypeScript files. It will compile all .ts files with default settings (outputting to the same directory).

Configuration files for TypeScript, ESLint, and Prettier are automatically generated via npm scripts and have been slightly adjusted to align with the project's specific development requirements.

## Known Issues

- **Fully Controlled:** The application's user interface (UI) and underlying model logic are within a single class. This design choice prioritizes simplicity and directness for the project's defined scope, limiting external interfaces to the primary rendering method
- **Encapsulated Control:** MiniTaskTracker is designed for internal control, with no public methods exposed beyond the essential render function. This approach maintains a tight scope and minimizes external dependencies

## Bonus Features Implemented

- **Local Storage Wrapper:** A custom, lightweight wrapper for browser local storage has been implemented to facilitate persistent data management specifically to the application's needs

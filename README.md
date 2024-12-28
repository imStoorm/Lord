# Bible App

A web application to read and navigate through the Bible efficiently. Users can select books and chapters, navigate between them, and view text dynamically loaded from the server.

## Features
- **Book and Chapter Selection:** Dropdown menus to select books and chapters.
- **Dynamic Navigation:** Buttons to navigate between chapters with state synchronization.
- **Loading State:** Feedback while data is being fetched.
- **Persistent State Management:** Keeps the interface in sync with user actions.

## Technology Stack
- **Frontend:** React with Next.js
- **Styling:** Tailwind CSS
- **Font Integration:** Custom local fonts and Google Fonts (Inter).
- **Data Management:** JSON-based Bible data with dynamic imports.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/imStoorm/Lord.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Lord
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run tauri dev
   ```

## Usage
- Use the dropdown menu to select a book and a chapter.
- Use the navigation buttons to move to the previous or next chapter.
- The content will dynamically update based on your selection.

## File Structure
```
.
├── app
│   ├── _components
│   │   ├── Header.tsx
│   │   ├── Bible.tsx
│   │   └── ui
│   │       ├── button.tsx
│   │       ├── select.tsx
│   │       └── ...
│   ├── _actions
│   │   └── get-text.ts
│   └── bible
│       └── page.tsx
├── public
│   ├── siglas.json
│   ├── nvi.json
│   └── fonts
│       └── Zodiak-Light.ttf
├── styles
├── README.md
└── ...
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request with detailed information about your changes.

### Steps to Contribute
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your fork:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [Tailwind CSS](https://tailwindcss.com/)
- [Next.js](https://nextjs.org/)
- [Google Fonts](https://fonts.google.com/)

---

### Contact
If you have any questions or suggestions, feel free to reach out!
- **Email:** imstoormdev@proton.me
- **GitHub:** [imStoorm](https://github.com/imStoorm)


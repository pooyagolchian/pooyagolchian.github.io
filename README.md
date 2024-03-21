My Website with Astro, Three.js and React.js
---
# Astro Project at pooya.blog

Welcome to the repository for the [pooya.blog](https://pooya.blog) website! This project leverages a modern web development stack including Astro, React.js, TypeScript, Three.js, React Fiber, and SCSS to deliver an interactive and visually rich web experience.

## Technologies

- **Astro**: Serving as the backbone of the project, providing efficient static site generation with capabilities to leverage components from various frameworks.
- **React.js**: Used for building reusable UI components with stateful logic and lifecycle methods.
- **TypeScript**: Ensuring type safety and enhancing developer experience and code maintainability.
- **Three.js & React Fiber**: Utilized for creating and rendering 3D graphics on the web browser using WebGL.
- **SCSS**: Enhanced CSS syntax that allows variables, nested rules, mixins, and more for styling.

## Setup and Development

To get started with this project, ensure you have Node.js installed on your system. Follow these steps to set up your development environment:

1. Clone the repository to your local machine:


2. Navigate into the project directory:

3. Install dependencies:

4. Start the development server:

Visit `http://localhost:8080` in your browser to view the project.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and create a pull request with your proposed changes. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

--- 


## Project structure
```
/
├── src/
│   ├── components/
│   │   ├── ReactComponents/        # React components
│   │   └── ThreeFiberComponents/   # Three.js and React Fiber components
│   ├── styles/
│   │   └── scss/                   # SCSS stylesheets
│   ├── pages/                      # Astro pages
│   ├── models/
│   │   └── 3DModels/               # 3D models for Three.js
│   ├── utils/                      # Utility functions
│   └── types/                      # TypeScript types and interfaces
├── public/
│   └── assets/
│       ├── images/                 # Static images
│       └── fonts/                  # Web fonts
├── tests/                          # Test files
├── scripts/                        # Utility scripts
├── .astro/                         # Astro configuration and setup files
├── node_modules/                   # Node modules (ignored in git)
├── .gitignore                      # Git ignore file
├── package.json                    # Project metadata and dependencies
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # Project README file

```

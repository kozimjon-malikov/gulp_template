# gulp-starter-kit

This repository provides a foundation for your web development projects using Gulp, simplifying your build process and streamlining tasks.

### Features

- Automate common tasks: Effortlessly compile SCSS/CSS, minify JavaScript/CSS, optimize images, and more.
- Streamlined development: Enjoy live reloading and file watching to see changes instantly.
- Production-ready builds: Generate minified and optimized files for performance in deployment.
- Organized structure: Benefit from a well-structured project layout with reusable components.
- Customization: Adapt and expand the Gulpfile to suit your specific project needs.

### Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### Development Server

Start the development server on `http://localhost:9050`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

### Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

### Project Structure:

```
your-project-name/
├── src/
│   ├── components/
│   │   ├── meta/
│   │   │   └── index.html
│   │   ├── footer.html
│   │   └── header.html
│   ├── css/
│   │   ├── parts/
│   │   │   ├── _footer.scss
│   │   │   └── _header.scss
│   │   ├── _buttons.scss
│   │   ├── _fonts.scss
│   │   ├── _main.scss
│   │   ├── _variables.scss
│   │   └── style.scss
│   ├── fonts/
│   │   └── your-fonts.woff
│   ├── images/
│   │   └── your-images.png
│   ├── js/
│   │   └── main.js
│   ├── third-party/
│   │   └── third-party files
│   └── index.html
├── .gitignore
├── config.js
├── gulpfile.js
├── package.json
├── postcss.config.js
└── README.md
```

- src: Contains your source code.
  - components: Reusable UI components, including meta header, footer, header, and mobile menu.
  - css: SASS stylesheets organized by purpose (\_variables, \_buttons, etc.) and individual components.
  - fonts: Custom fonts used in your project.
  - images: Images used in your project.
  - js: JavaScript files, with main.js as the entry point.
  - third-party: Third-party libraries or dependencies.
  - index.html: Main HTML file, potentially importing your components.
- .gitignore: Specifies files to be excluded from version control.
- config.js: Stores various configuration options used throughout the project.
- gulpfile.js: The heart of the build process, defining tasks for compilation, minification, and other automation.
- package.json: Lists project dependencies and scripts.
- postcss.config.js: Configuration for PostCSS, used for processing CSS with plugins.
- README.md: This file, containing documentation and instructions.

### Customization:

Feel free to modify the scripts, tasks, and configurations in the gulpfile.js and config.js files to match your project's requirements. Add new components, adjust Sass and JavaScript settings, or modify any other configurations as needed.

#### For more information on Gulp and its plugins, refer to the official documentation: [Gulp js](https://gulpjs.com/). Also this repo is inspired by [lazymozek/gulp-with-tailwindcss](https://github.com/lazymozek/gulp-with-tailwindcss) and incorporates its concepts with additional features.

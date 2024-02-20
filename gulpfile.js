const { src, dest, watch, series, parallel } = require("gulp");
const clean = require("gulp-clean");
const options = require("./config");
const browserSync = require("browser-sync").create();

// Core plugins for file processing
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const concat = require("gulp-concat");
const uglify = require("gulp-terser");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const purgecss = require("gulp-purgecss");
const logSymbols = require("log-symbols");
const includePartials = require("gulp-file-include");
const htmlPretty = require("gulp-pretty-html");

// Function to start BrowserSync preview during development
function livePreview(done) {
  browserSync.init({
    server: {
      baseDir: options.paths.dist.base, // Serve files from the 'dist' folder
    },
    port: options.config.port || 5000, // Use configured port or default to 5000
  });
  done();
}

// Function to reload the browser preview
function previewReload(done) {
  console.log("\n\t" + logSymbols.info, "Reloading Browser Preview. 🔄\n");
  browserSync.reload();
  done();
}

// Development tasks
// ---------------------------------------------------------------------------

function devHTML() {
  return src(`${options.paths.src.base}/*.html`)
    .pipe(includePartials()) // Include partials if needed
    .pipe(htmlPretty()) // Format HTML for readability
    .pipe(dest(options.paths.dist.base)); // Output to 'dist' folder
}

function devStyles() {
  const autoprefixer = require("autoprefixer");
  return src(`${options.paths.src.css}/**/*.scss`)
    .pipe(sass().on("error", sass.logError)) // Compile SASS with error logging
    .pipe(postcss([autoprefixer()])) // Add vendor prefixes
    .pipe(concat({ path: "style.css" }))
    .pipe(dest(options.paths.dist.css)); // Output to 'dist/css' folder
}

function devScripts() {
  return src([
    `${options.paths.src.js}/libs/**/*.js`,
    `${options.paths.src.js}/**/*.js`,
  ]).pipe(dest(options.paths.dist.js));
}

function devImages() {
  return src(`${options.paths.src.images}/**/*`).pipe(
    dest(options.paths.dist.images)
  );
}

function devFonts() {
  return src(`${options.paths.src.fonts}/**/*`).pipe(
    dest(options.paths.dist.fonts)
  );
}

function devThirdParty() {
  return src(`${options.paths.src.thirdParty}/**/*`).pipe(
    dest(options.paths.dist.thirdParty)
  );
}

function watchFiles() {
  watch(
    `${options.paths.src.base}/**/*.{html,php}`,
    series(devHTML, devStyles, previewReload)
  );
  watch(
    [`${options.paths.src.css}/**/*.scss`],
    series(devStyles, previewReload)
  );
  watch(`${options.paths.src.js}/**/*.js`, series(devScripts, previewReload));
  watch(`${options.paths.src.images}/**/*`, series(devImages, previewReload));
  watch(`${options.paths.src.fonts}/**/*`, series(devFonts, previewReload));
  watch(
    `${options.paths.src.thirdParty}/**/*`,
    series(devThirdParty, previewReload)
  );
  console.log(`${options.paths.src.css}/**/*.scss`);
  console.log("\n\t" + logSymbols.info, "Watching for Changes.. 👀\n");
}

function devClean() {
  console.log(
    "\n\t" + logSymbols.info,
    "Cleaning dist folder for fresh start. 🧹\n"
  );
  return src(options.paths.dist.base, { read: false, allowEmpty: true }).pipe(
    clean()
  );
}

// Production tasks
// ---------------------------------------------------------------------------

function prodHTML() {
  return src(`${options.paths.src.base}/**/*.{html,php}`)
    .pipe(includePartials())
    .pipe(htmlPretty())
    .pipe(dest(options.paths.build.base));
}

function prodStyles() {
  const autoprefixer = require("autoprefixer");
  const cssnano = require("cssnano");
  return (
    src(`${options.paths.src.css}/**/*.scss`)
      .pipe(sass().on("error", sass.logError))
      .pipe(postcss([autoprefixer(), cssnano()]))
      // .pipe(
      //   purgecss({
      //     ...options.config.purgecss,
      //     defaultExtractor: (content) => {
      //       // without arbitray selectors
      //       // const v2Regex = /[\w-:./]+(?<!:)/g;
      //       // with arbitray selectors
      //       const v3Regex = /[(\([&*\])|\w)-:./]+(?<!:)/g;
      //       const broadMatches = content.match(v3Regex) || [];
      //       const innerMatches =
      //         content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
      //       return broadMatches.concat(innerMatches);
      //     },
      //   })
      // )
      .pipe(dest(options.paths.build.css)) // Output to 'build/css' folder
  );
}

function prodScripts() {
  return src([
    `${options.paths.src.js}/libs/**/*.js`,
    `${options.paths.src.js}/**/*.js`,
  ])
    .pipe(uglify())
    // .pipe(
    //   rename(function (path) {
    //     path.basename += ".min";
    //   })
    // )
    .pipe(dest(options.paths.build.js));
}

function prodImages() {
  const pngQuality = Array.isArray(options.config.imagemin.png)
    ? options.config.imagemin.png
    : [0.7, 0.7];
  const jpgQuality = Number.isInteger(options.config.imagemin.jpeg)
    ? options.config.imagemin.jpeg
    : 70;
  const plugins = [
    pngquant({ quality: pngQuality }),
    mozjpeg({ quality: jpgQuality }),
  ];

  return src(options.paths.src.images + "/**/*")
    .pipe(imagemin([...plugins]))
    .pipe(dest(options.paths.build.images));
}

function prodFonts() {
  return src(`${options.paths.src.fonts}/**/*`).pipe(
    dest(options.paths.build.fonts)
  );
}

function prodThirdParty() {
  return src(`${options.paths.src.thirdParty}/**/*`).pipe(
    dest(options.paths.build.thirdParty)
  );
}

function prodClean() {
  console.log(
    "\n\t" + logSymbols.info,
    "Cleaning build folder for fresh start. 🧹\n"
  );
  return src(options.paths.build.base, { read: false, allowEmpty: true }).pipe(
    clean()
  );
}

function buildFinish(done) {
  console.log(
    "\n\t" + logSymbols.info,
    `Production build is complete. Files are located at ${options.paths.build.base} ✅\n`
  );
  done();
}

// Default task for development
exports.default = series(
  devClean, // Clean 'dist' folder
  parallel(devStyles, devScripts, devImages, devFonts, devThirdParty, devHTML), // Run tasks in parallel for efficiency
  livePreview, // Start BrowserSync preview
  watchFiles // Watch for changes and rerun tasks
);

// Production task
exports.prod = series(
  prodClean, // Clean 'build' folder
  parallel(
    prodStyles,
    prodScripts,
    prodImages,
    prodHTML,
    prodFonts,
    prodThirdParty
  ), // Run tasks in parallel
  buildFinish // Notify completion and output location
);

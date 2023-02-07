const { src, dest, watch, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "app/",
            notify: false
        }
    });
}

function scripts() {
 return src([
    'app/js/app.js'
])
 .pipe(concat('app.min.js'))
 .pipe(uglify())
 .pipe(dest('app/js/'))
 .pipe(browserSync.stream())
}

function styles() {
    return src('app/css/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.min.css'))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 5 versions'], grid: true }))
    .pipe(cleanCSS({specialComments: 0}))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function startWatch() {
    watch(['app/**/*.js', '!app/**/*.min.js'], scripts)
    watch(['app/**/*.scss'], styles)
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;

exports.default = parallel(scripts, styles, browsersync, startWatch);
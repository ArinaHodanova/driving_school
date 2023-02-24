const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
//const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const gulpWatch = require('gulp-watch');

//изменяемые файлы
const cssFiles = [
    './app/css/style.css',
    './app/css/main.scss',
]

function style() {
    return gulp.src(cssFiles)
    
    .pipe(autoprefixer(['last 4 versions']))
    // .pipe(cleanCSS({
    //     level: 2
    // }))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))

    //Выходная папка для стилей
    .pipe(gulp.dest('./css'))
}


gulp.task('styles', style);
'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import fileinclude from 'gulp-file-include';
import fontgen from 'gulp-fontgen';
import imagemin from 'gulp-imagemin';
import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';
import zip from 'gulp-zip';

const dirs = {
    src: './src',
    dest: './build'
};

const paths = {
    sassSrc: `${dirs.src}/styles/style.scss`,
    sassDest: `${dirs.dest}/styles/`,
    sassWatch: `${dirs.src}/styles/**/*.scss`,
    jsSrc: `${dirs.src}/js/**/*.js`,
    jsDest: `${dirs.dest}/js/`,
    htmlSrc: `${dirs.src}/html/*.html`,
    jsAdditional: `${dirs.src}/libs/jquery/dist/jquery.js`,
    htmlDest: `${dirs.dest}`,
    fontsSrc: `${dirs.src}/fonts/`,
    fontDest: [`${dirs.src}/styles/fonts/`,`${dirs.dest}/styles/fonts/`],
    imageSrc: `${dirs.src}/img/*`,
    imageDest: `${dirs.dest}/img/`
};

gulp.task('style', () => {
    return gulp.src(paths.sassSrc)
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.sassDest))
});

gulp.task('html', () => {
    gulp.src(paths.htmlSrc)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(paths.htmlDest))
});

gulp.task('fontgen', () => {
    gulp.src(`${paths.fontsSrc}/*`)
        .pipe(fontgen({
            dest: paths.fontDest[0]
        }))
        .pipe(fontgen({
            dest: paths.fontDest[1]
        }))
});

gulp.task('image-min', () => {
    gulp.src(paths.imageSrc)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.imageDest))
});

gulp.task('js', () => {
    gulp.src([paths.jsAdditional, paths.jsSrc])
        .pipe(concat('main.js'))
        .pipe(gulp.dest(paths.jsDest))
});

gulp.task('watch', () => {
    gulp.watch(`${paths.sassWatch}`, ['style']);
    gulp.watch(`${dirs.src}/html/**/*.html`, ['html']);
    gulp.watch(`${dirs.src}/js/**/*.js`, ['js'])
});

gulp.task('zip', () => {
    return gulp.src('./build/**/*')
        .pipe(zip('teleset.zip'))
        .pipe(gulp.dest('./'))
});

gulp.task('default',['style','html', 'js', 'image-min', 'watch', 'zip'], () => {});


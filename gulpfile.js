const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const cssmin = require('gulp-csso');
const stylus = require('gulp-stylus');
const nib = require('nib');
const del = require('del');
const plumber = require('gulp-plumber');
const browserSync = require("browser-sync");
const reload = browserSync.reload;

gulp.task('clean:css', cleanCss);
gulp.task('clean:js', cleanJs);
gulp.task('clean', clean);

gulp.task('copy:images', copyImages);
gulp.task('copy:fonts', copyFonts);
gulp.task('copy:libraries', copyLibraries);
gulp.task('copy:css', copyCss);
gulp.task('copy:indexAmp', copyIndexAmp);

gulp.task('compile:js', compileJs);
gulp.task('compile:stylus', compileStylus);
gulp.task('server', startServer);

gulp.task('build', ['clean', 'copy:fonts', 'copy:images', 'copy:libraries', 'copy:indexAmp', 'compile:js', 'compile:stylus'], copyIndex);

gulp.task('watcher:css', ['clean:css', 'compile:stylus'], copyIndex);
gulp.task('watcher:js', ['clean:js', 'compile:js'], copyIndex);
gulp.task('watch', ['build'], watch);

gulp.task('server:watch', ['server', 'build'], watch);
gulp.task('default', ['build']);

function startServer() {
    browserSync({
        server: {
            baseDir: "./app"
        },
        host: 'localhost',
        port: 3030
    });
}

function clean() {
    del.sync(['./app']);
    console.log('[--------] App folder was deleted');
}

function copyIndex() {
    return gulp.src('./source/index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./app'))
        .pipe(reload({stream: true}));
}

function copyIndexAmp() {
    return gulp.src(['./source/index.amp.html', './source/robots.txt', './source/sitemap.xml'])
        .pipe(gulp.dest('./app'))
        .pipe(reload({stream: true}));
}

function compileJs() {
    return browserify({entries: './source/app/app.js'}).bundle()
        .pipe(plumber())
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./app/scripts'));
}

function compileStylus() {
    return gulp.src('./source/styles/styles.styl')
        .pipe(stylus({
            'paths':  ['node_modules', 'source/styles'],
            'import': ['nib', 'stylus-type-utils'],
            'use': [nib()],
            'include css': true
        }))
        .pipe(plumber())
        .pipe(cssmin())
        .pipe(gulp.dest('./app/styles'))
}

function copyImages() {
    return gulp.src('./source/images/**/*.*')
        .pipe(plumber())
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('./app/images'));
}

function copyFonts() {
    return gulp.src('./source/fonts/**/*.*')
        .pipe(plumber())
        .pipe(gulp.dest('./app/fonts'));
}

function copyCss() {
    return gulp.src([
        './node_modules/ngmodal/dist/ng-modal.css',
        './node_modules/simplebar/dist/simplebar.css',
        './node_modules/normalize.css/normalize.css'
    ])
    .pipe(plumber())
    .pipe(gulp.dest('./source/styles/libs/'));
}
function copyLibraries() {
    return gulp.src([
        './node_modules/angular/angular.min.js',
        './node_modules/simplebar/dist/simplebar.js',
        './node_modules/angular-translate/dist/angular-translate.min.js',		
        './source/libs/**/*.*'
    ])
    .pipe(plumber())
    .pipe(gulp.dest('./app/libs/'));
}

function cleanCss() {
    del.sync(['./app/styles/**']);
}

function cleanJs() {
    del.sync(['./app/app.*']);
}

function watch() {
    gulp.watch(['./source/styles/**/*.styl', './source/styles/**/*.css'], ['watcher:css']);
    gulp.watch(['./source/**/*.html', './source/**/*.js'], ['watcher:js']);
}
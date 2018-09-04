var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var newer = require('gulp-newer');
var htmlClean = require('gulp-htmlclean');
var less = require('gulp-less');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var postcss = require('gulp-postcss');
var stripDebug = require("gulp-strip-debug");

var folder = {
    src: "./src/",
    build: "./build/"
}

gulp.task("images", function () {
    gulp.src(folder.src + "images/*")
        .pipe(newer(folder.build + "images"))
        .pipe(imagemin())
        .pipe(gulp.dest(folder.build + "images/"));
})

gulp.task("html", function () {
    gulp.src(folder.src + "html/*")
        .pipe(htmlClean())
        .pipe(gulp.dest(folder.build + "html/"));
})
gulp.task("js", function () {
    gulp.src(folder.src + "js/*")
        .pipe(uglify())
        .pipe(stripDebug())
        .pipe(gulp.dest(folder.build + 'js/'));
})
gulp.task("css", function() {
    gulp.src(folder.src + "css/*.less")
    .pipe(autoprefix())
    .pipe(less())
    .pipe(gulp.dest(folder.build + "css/"));
})

gulp.task("watch",function(){
    gulp.watch(folder.src + "html/*",["html"]);
    gulp.watch(folder.src + "images/*",["images"]);
    gulp.watch(folder.src + "js/*",["js"]);
    gulp.watch(folder.src + "css/*",["css"]);
})

// gulp.task("server",function(){
//     connect.server({
//         port : "8081",
//         livereload : true
//     });
// })

gulp.task("default", ["images", "html", "css", "js","watch"], function () {});
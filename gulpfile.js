const gulp = require("gulp"),
    path = require("path"),
    runSequence = require("run-sequence"),
    exec = require("child_process").exec,
    sass = require("gulp-sass"),
    tildeImporter = require("node-sass-tilde-importer")
;

const rootFolder = path.join(__dirname);
const srcFolder = path.join(rootFolder, "lib");
const distFolder = path.join(rootFolder, "dist");

//TS
const distScssFolder = path.join(distFolder, "scss");
const distCssFolder = path.join(distFolder, "css");

gulp.task("build:scss", function (cb) {
    console.info("Build:SCSS");
    gulp.src([
        `${srcFolder}/scss/xmat-library.scss`,
    ])
    .pipe(sass({
        importer: tildeImporter
    }))
    .pipe(gulp.dest(distCssFolder));

    cb();
});

gulp.task("copy:scss", function (cb) {
    console.info("Copy:SCSS");
    gulp.src([
        `${srcFolder}/**/*.scss`,
    ])
    .pipe(gulp.dest(distFolder));

    cb();
});

gulp.task("packagr", function (cb) {
    exec("ng-packagr -p ng-package.json", function (err, stdout, stderr) {
        console.info("packed");

        cb(err);
    });
});

gulp.task("build", function (callback) {
    runSequence("packagr", "build:scss", "copy:scss", callback);
});


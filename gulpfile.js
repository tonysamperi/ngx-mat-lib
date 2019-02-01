"use strict";

function logStart(msg) {
    console.info("***** Task '" + msg + "' started *****");
}

function logEnd(msg) {
    console.info("***** Task '" + msg + "' finished *****");
}

const gulp = require("gulp"),
    path = require("path"),
    runSequence = require("run-sequence"),
    exec = require("child_process").exec,
    sass = require("gulp-sass"),
    tildeImporter = require("node-sass-tilde-importer")
;

const rootFolder = path.join(__dirname);
const srcFolder = path.join(rootFolder, "projects/ngx-mat-lib/src/lib");
const distFolder = path.join(rootFolder, "dist/ngx-mat-lib");
const distCssFolder = path.join(distFolder, "css");

const taskNames = {
    ngBuild: "ngBuild",
    main: "build",
    mdsCopy: "mdsCopy",
    pack: "pack",
    stylesCopy: "copy:scss",
    stylesBuild: "build:scss"
};

gulp.task(taskNames.ngBuild, (cb) => {
    logStart(taskNames.ngBuild);
    exec("ng build ngx-mat-lib", (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        logEnd(taskNames.ngBuild);
        cb(err);
    });
});

gulp.task(taskNames.stylesBuild, (cb) => {
    logStart(taskNames.stylesBuild);
    gulp.src([
        `${srcFolder}/scss/xmat-library.scss`,
    ])
    .pipe(sass({
        importer: tildeImporter
    }))
    .pipe(gulp.dest(distCssFolder));
    logEnd(taskNames.stylesBuild);
    cb();
});

gulp.task(taskNames.stylesCopy, (cb) => {
    logStart(taskNames.stylesCopy);
    gulp.src([
        `${srcFolder}/**/*.scss`,
    ])
    .pipe(gulp.dest(distFolder));
    logEnd(taskNames.stylesCopy);
    cb();
});

gulp.task(taskNames.mdsCopy, (cb) => {
    logStart(taskNames.mdsCopy);
    gulp.src([
        `${rootFolder}/changelog.md`,
        `${rootFolder}/README.md`,
    ])
    .pipe(gulp.dest(distFolder));
    logEnd(taskNames.mdsCopy);
    cb();
});

// PACK
gulp.task(taskNames.pack, (cb) => {
    logStart(taskNames.pack);
    exec("npm pack ./dist/ngx-mat-lib", (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        logEnd(taskNames.pack);
        cb(err);
    });
});

// MAIN
gulp.task(taskNames.main, function (cb) {
    logStart(taskNames.main);
    runSequence(taskNames.ngBuild, taskNames.stylesBuild, [taskNames.stylesCopy, taskNames.mdsCopy], (err) => {
        logEnd(taskNames.main);
        cb(err)
    });
});

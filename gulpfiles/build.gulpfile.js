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

const libName = "ngx-mat-lib";
const rootFolder = path.join(__dirname, "..", "/");
const libFolder = path.join(rootFolder, `projects/${libName}/src/lib`);
const distFolder = path.join(rootFolder, `dist/${libName}`);
const distCssFolder = path.join(distFolder, "css");

// SASS TEST VARS
const scssTestFolder = path.join(rootFolder, "scss-test");
const libStylesFolder = path.join(libFolder, "scss");
const testStylesFolder = path.join(rootFolder, "src");

const taskNames = {
    ngBuild: "ngBuild",
    main: "build",
    mdsCopy: "mdsCopy",
    pack: "pack",
    stylesCopy: "copy:scss",
    stylesBuild: "build:scss",
    stylesTest: "test:scss"
};

gulp.task(taskNames.ngBuild, (cb) => {
    logStart(taskNames.ngBuild);
    exec(`ng build ${libName}`, (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        logEnd(taskNames.ngBuild);
        cb(err);
    });
});

gulp.task(taskNames.stylesBuild, (cb) => {
    logStart(taskNames.stylesBuild);
    gulp.src([
        `${libFolder}/scss/xmat-library.scss`,
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
        `${libFolder}/**/*.scss`,
    ])
    .pipe(gulp.dest(distFolder));
    logEnd(taskNames.stylesCopy);
    cb();
});

gulp.task(taskNames.mdsCopy, (cb) => {
    logStart(taskNames.mdsCopy);
    gulp.src([
        path.join(rootFolder, "changelog.md"),
        path.join(rootFolder, "README.md")
    ])
    .pipe(gulp.dest(distFolder));
    logEnd(taskNames.mdsCopy);
    cb();
});

// PACK
gulp.task(taskNames.pack, (cb) => {
    logStart(taskNames.pack);
    exec(`npm pack ./dist/${libName}`, (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        logEnd(taskNames.pack);
        cb(err);
    });
});

// MAIN
gulp.task(taskNames.main, (cb) => {
    logStart(taskNames.main);
    runSequence(taskNames.ngBuild, taskNames.stylesBuild, [taskNames.stylesCopy, taskNames.mdsCopy], (err) => {
        logEnd(taskNames.main);
        cb(err)
    });
});

// TEST SASS
gulp.task(taskNames.stylesTest, (cb) => {
    logStart(taskNames.stylesBuild);
    gulp.src([
        `${testStylesFolder}/styles.scss`,
    ])
    .pipe(sass({
        importer: tildeImporter,
        includePaths: [libStylesFolder]
    }))
    .pipe(gulp.dest(scssTestFolder));
    console.info(`Built css in ${`${scssTestFolder}/styles.css`}`);
    logEnd(taskNames.stylesBuild);
    cb();
});

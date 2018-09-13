const gulp = require("gulp"),
    path = require("path"),
    ngc = require("@angular/compiler-cli/src/main").main,
    rollup = require("gulp-rollup"),
    rename = require("gulp-rename"),
    fs = require("fs-extra"),
    runSequence = require("run-sequence"),
    exec = require("child_process").exec,
    inlineResources = require("./tools/gulp/inline-resources"),
    sass = require("gulp-sass"),
    tildeImporter = require("node-sass-tilde-importer");

const rootFolder = path.join(__dirname);
const srcFolder = path.join(rootFolder, "src");
const tmpFolder = path.join(rootFolder, ".tmp");
const buildFolder = path.join(rootFolder, "build");
const distFolder = path.join(rootFolder, "dist");

//TS
const scssFolder = path.join(srcFolder, "scss");
const scssDistFolder = path.join(distFolder, "scss");
const cssDistFolder = path.join(distFolder, "css");
const rollupGlobals = {
    "@angular/animations": "ng.animations",
    "@angular/cdk/coercion": "ng.cdk",
    "@angular/cli": "ng.cli",
    "@angular/compiler": "ng.compiler",
    "@angular/compiler-cli": "ng.compilerCli",
    "@angular/flex-layout": "ng.flexLayout",
    "@angular/material": "ng.material",
    "@angular/platform-browser-dynamic": "ng.platformBrowserDynamic",
    "lodash": "lodash",
    "@angular/core": "ng.core",
    "@angular/platform-browser": "ng.platformBrowser",
    "@angular/common": "ng.common",
    "@angular/forms": "ng.forms",
    "@angular/router": "ng.router",
    "rxjs/Observable": "Rx.Observable",
    "rxjs/Subject": "Rx.Subject",
    "typescript": "ts"
};

/**
 * 1. Delete /dist folder
 */
gulp.task("clean:dist", function () {

    // Delete contents but not dist folder to avoid broken npm links
    // when dist directory is removed while npm link references it.
    return fs.emptyDirSync(distFolder);
});

/**
 * 2. Clone the /src folder into /.tmp. If an npm link inside /src has been made,
 *    then it"s likely that a node_modules folder exists. Ignore this folder
 *    when copying to /.tmp.
 */
gulp.task("copy:source", function () {
    return gulp.src([`${srcFolder}/**/*`, `!${srcFolder}/node_modules`])
    .pipe(gulp.dest(tmpFolder));
});

/**
 * 3. Inline template (.html) and style (.css) files into the the component .ts files.
 *    We do this on the /.tmp folder to avoid editing the original /src files
 */
gulp.task("inline-resources", function (cb) {
    // return Promise.resolve().then(() => inlineResources(tmpFolder));
    inlineResources(tmpFolder).then(() => {
        cb();
    })
});


/**
 * 4. Run the Angular compiler, ngc, on the /.tmp folder. This will output all
 *    compiled modules to the /build folder.
 *
 *    As of Angular 5, ngc accepts an array and no longer returns a promise.
 */
gulp.task("ngc", function (cb) {
    ngc(["--project", `${tmpFolder}/tsconfig.es5.json`]);
    // return Promise.resolve()
    cb();
});

/**
 * 5. Run rollup inside the /build folder to generate our Flat ES module and place the
 *    generated file into the /dist folder
 */
gulp.task("rollup:fesm", function () {
    return gulp.src(`${buildFolder}/**/*.js`)
    // transform the files here.
    .pipe(rollup({
        input: `${buildFolder}/index.js`,
        allowRealFiles: true,
        external: Object.keys(rollupGlobals),
        onwarn: function () {
            // console.log("** WARNING PREVENTED **");
        },
        output: {
            // Format of generated bundle
            // See "format" in https://rollupjs.org/#core-functionality
            format: "es"
        }
    }))
    .pipe(gulp.dest(distFolder));
});

/**
 * 6. Run rollup inside the /build folder to generate our UMD module and place the
 *    generated file into the /dist folder
 */
gulp.task("rollup:umd", function () {
    return gulp.src(`${buildFolder}/**/*.js`)
    .pipe(rollup({
        input: `${buildFolder}/index.js`,
        allowRealFiles: true,
        external: Object.keys(rollupGlobals),
        onwarn: function () {
            // console.log("** WARNING PREVENTED **");
        },
        output: {
            name: "ngx-mat-lib",
            globals: {
                typescript: "ts"
            },
            format: "umd",
            exports: "named"
        }
    }))
    .pipe(rename("ngx-mat-lib.umd.js"))
    .pipe(gulp.dest(distFolder));
});

/**
 * 7. Copy all the files from /build to /dist, except .js files. We ignore all .js from /build
 *    because with don"t need individual modules anymore, just the Flat ES module generated
 *    on step 5.
 */
gulp.task("copy:build", function () {
    return gulp.src([`${buildFolder}/**/*`, `!${buildFolder}/**/*.js`])
    .pipe(gulp.dest(distFolder));
});

/**
 * 8. Copy package.json from /src to /dist
 */
gulp.task("copy:manifest", function () {
    return gulp.src([`${srcFolder}/package.json`])
    .pipe(gulp.dest(distFolder));
});

/**
 * 9. Copy README.md from / to /dist
 * [TS] Copy scss folder to /dist
 */
gulp.task("copy:readme", function () {
    return gulp.src([path.join(rootFolder, "README.MD")])
    .pipe(gulp.dest(distFolder));
});

/**
 * 9b. [TS] Copy scss folder from / to /dist
 */
gulp.task("copy:scss", function () {
    console.info("Copy:SCSS");
    return gulp.src([`${scssFolder}/**/*`])
    .pipe(gulp.dest(scssDistFolder))
});

/**
 * 9c. [TS] Build scss folder from /dist/scss to /dist/css
 */
gulp.task("build:scss", function () {
    console.info("Build:SCSS");
    return gulp.src([
        `${scssDistFolder}/xmat-library.scss`,
    ]).pipe(sass({
        importer: tildeImporter
    }))
    .pipe(gulp.dest(cssDistFolder));
});


/**
 * 10. Delete /.tmp folder
 */
gulp.task("clean:tmp", function (cb) {
    return deleteFolder(tmpFolder, cb);
});

/**
 * 11. Delete /build folder
 */
gulp.task("clean:build", function (cb) {
    return deleteFolder(buildFolder, cb);
});

gulp.task("compile", function (callback) {
    runSequence(
        "clean:dist",
        "copy:source",
        "inline-resources",
        "ngc",
        "rollup:fesm",
        "rollup:umd",
        "copy:build",
        "copy:manifest",
        "copy:readme",
        "copy:scss",
        "build:scss",
        "clean:build",
        "clean:tmp",
        function (err) {
            if (err) {
                console.log("ERROR:", err.message);
                deleteFolder(distFolder);
                deleteFolder(tmpFolder);
                deleteFolder(buildFolder);
            } else {
                console.info("Compilation finished succesfully");
                callback();
            }
        });
});

/**
 * Watch for any change in the /src folder and compile files
 */
gulp.task("watch", function () {
    gulp.watch(`${srcFolder}/**/*`, ["compile"]);
});

gulp.task("clean", function (callback) {
    runSequence("clean:dist", "clean:tmp", "clean:build", callback);
});

gulp.task("build", function (callback) {
    runSequence("clean", "compile", callback);
});

gulp.task("pack", function (cb) {
    exec("npm pack ./dist", function (err, stdout, stderr) {
        console.info("packed");
        cb(err);
    });
});

gulp.task("delete:dist", function (callback) {
    deleteFolder(distFolder, callback);
});

gulp.task("build:pack", function (callback) {
    runSequence("build", "pack", "delete:dist", callback);
});

gulp.task("build:watch", function (callback) {
    runSequence("build", "watch", callback);
});

gulp.task("default", ["build:watch"]);

/**
 * Deletes the specified folder
 */
function deleteFolder(folder, cb) {
    fs.removeSync(folder);
    cb();
}

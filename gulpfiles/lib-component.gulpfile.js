const gulp = require("gulp");
const path = require("path");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const runSequence = require("run-sequence");
const readlineSync = require('readline-sync');

// STRINGS
const appPrefix = "xmat";
const dash = "-";
const errorMsg = " task failed";
const successMsg = " task completed succesfully";

// PATHS
const rootFolder = path.join(__dirname, "..", "/");
const contentFiles = path.join(__dirname, "component/**");
const libFolder = path.join(rootFolder, "projects/ngx-mat-lib/src/lib/");
const compsFolder = path.join(libFolder, "components");

const tasks = {
    create: "newcompLib:create",
    main: "newcomp:lib",
    write: "newcompLib:write"
};

const replaceLowerNeedle = /xxx/gm;
const replaceUpperNeedle = /Xxx/gm;

// SUPPORT VARS - START
let upperCompName;
let compName;
let compDest;

// SUPPORT VARS - END

function mainSequenceCallback(err) {
    if (err) {
        console.log(tasks.main + errorMsg, err.message);
        // deleteFolder(distFolder);
    } else {
        console.log(tasks.main + successMsg);
    }
}

function kebabToCamel(string) {
    return string.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

gulp.task(tasks.create, (cb) => {
    compName = "";
    upperCompName = "";
    dest = "";
    compDest = "";
    compName = readlineSync.question("Choose a name for your component (lowercase)");
    if (!compName) {
        return console.error(new Error("You moron!! Name can't be empty!!"));
    }
    compName = compName.toLowerCase().replace(/\s+/g, dash).replace(/-+/g, dash);
    console.info("CHOSEN COMP NAME: ", compName);
    upperCompName = kebabToCamel(compName);
    upperCompName = capitalizeFirstLetter(appPrefix) + capitalizeFirstLetter(upperCompName);
    compDest = path.join(compsFolder, [appPrefix, compName].join(dash));
    cb();
});

gulp.task(tasks.write, (cb) => {
    const answer = readlineSync.keyInYN("Finalize?");
    if (!answer) {
        return cb();
    }
    const lowerName = [appPrefix, compName].join(dash);
    return gulp.src(contentFiles)
    .pipe(replace(replaceLowerNeedle, lowerName))
    .pipe(replace(replaceUpperNeedle, upperCompName))
    .pipe(rename(function (path) {
        path.basename = path.basename.replace(replaceLowerNeedle, lowerName);
        path.basename = path.basename.replace(replaceUpperNeedle, upperCompName)
    }))
    .pipe(gulp.dest(compDest));
    // .pipe(gulp.dest(distFolder, {overwrite: false})) // TODO: ENABLE WHEN GULP 4 IS RELEASED
    // .pipe(gulp.dest(dummyDest)) // FOR TEST PURPOSES
});

// MAIN TASK
gulp.task(tasks.main, function () {
    runSequence(tasks.create, tasks.write, mainSequenceCallback);
});

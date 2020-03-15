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
const contentFiles = path.join(__dirname, "component/*component*");
const appFolder = path.join(rootFolder, "src/app");
const viewsFolder = path.join(appFolder, "views");
const compsFolder = path.join(appFolder, "components");

const tasks = {
    create: "newcompDemo:create",
    main: "newcomp:demo",
    write: "newcompDemo:write"
};

const replaceLowerNeedle = /xxx/gm;
const replaceUpperNeedle = /Xxx/gm;

const compTypes = ["shared", "view"];

// SUPPORT VARS - START
let upperCompName;
let compName;
let compType;
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
    const compTypeIndex = readlineSync.keyInSelect(compTypes, "What type of comp would you like to build?");
    compType = compTypes[compTypeIndex];
    console.info("CHOSEN COMP TYPE", compType);
    compName = readlineSync.question("Choose a name for your component (lowercase)");
    if (!compName) {
        return console.error(new Error("You moron!! Name can't be empty!!"));
    }
    compName = appPrefix + dash + compName.toLowerCase().replace(/\s+/g, dash).replace(/-+/g, dash);
    console.info("FINAL COMP NAME: ", compName);
    upperCompName = capitalizeFirstLetter(kebabToCamel(compName));
    switch (compType) {
        case compTypes[0]: // COMPS
            compDest = path.join(compsFolder, compName);
            break;
        case compTypes[1]: // VIEWS
            compDest = path.join(viewsFolder, compName);
            break;
        default:
            return console.error(new Error("Whoops, something bad happened"));
    }
    cb();
});

gulp.task(tasks.write, (cb) => {
    const answer = readlineSync.keyInYN("Finalize?");
    if (!answer) {
        return cb();
    }
    return gulp.src(contentFiles)
    .pipe(replace(replaceLowerNeedle, compName))
    .pipe(replace(replaceUpperNeedle, upperCompName))
    .pipe(rename(function (path) {
        path.basename = path.basename.replace(replaceLowerNeedle, compName);
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
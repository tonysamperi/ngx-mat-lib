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
const compSourceFiles = path.join(__dirname, "component/**");
const directiveSourceFiles = path.join(__dirname, "directive/**");
const libFolder = path.join(rootFolder, "projects/ngx-mat-lib/src/lib/");
const compsFolder = path.join(libFolder, "components");
const directivesFolder = path.join(libFolder, "directives");

const tasks = {
    create: "newcompLib:create",
    main: "newcomp:lib",
    write: "newcompLib:write"
};

const replaceLowerNeedle = /xxx/gm;
const replaceUpperNeedle = /Xxx/gm;

const compTypes = ["component", "directive"];

// SUPPORT VARS - START
let compDest, compName, compType, upperCompName, sourceFiles;

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
    if (compTypeIndex === -1) {
        return console.info("User cancelled.");
    }
    compType = compTypes[compTypeIndex];
    console.info("CHOSEN COMP TYPE", compType);
    compName = readlineSync.question("Choose a name for your component (lowercase)");
    if (!compName) {
        return console.error(new Error("You moron!! Name can't be empty!!"));
    }
    compName = compName.toLowerCase().replace(/\s+/g, dash).replace(/-+/g, dash);
    console.info("CHOSEN COMP NAME: ", compName);
    upperCompName = kebabToCamel(compName);
    upperCompName = capitalizeFirstLetter(appPrefix) + capitalizeFirstLetter(upperCompName);

    switch (compType) {
        case compTypes[0]: // COMPS
            compDest = path.join(compsFolder, [appPrefix, compName].join(dash));
            sourceFiles = compSourceFiles;
            break;
        case compTypes[1]: // VIEWS
            compDest = path.join(directivesFolder, [appPrefix, compName].join(dash));
            sourceFiles = directiveSourceFiles;
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
    const lowerName = [appPrefix, compName].join(dash);
    return gulp.src(sourceFiles)
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

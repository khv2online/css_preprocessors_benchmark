"use strict";

const { src, dest, lastRun, series, parallel, watch } = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const less = require("gulp-less");
// const gulpif = require("gulp-if");
const changed = require("gulp-changed");
// const progeny = require("gulp-progeny");
// const filter = require("gulp-filter");

// TODO: try to return to the dart sass compiler after few updates (v1.34+)
sass.compiler = require("sass");

function sassBuild() {
  return src("src/*.scss", { since: lastRun(sass) })
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(changed("dist/css", { hasChanged: changed.compareContents }))
    .pipe(dest("dist/css"));
}

function lessBuild() {
  return src("src/*.less", { since: lastRun(less) })
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(changed("dist/css", { hasChanged: changed.compareContents }))
    .pipe(dest("dist/css"));
}

exports.sass = sassBuild;
exports.less = lessBuild;

// exports.dev = series(
//   setEsBuildToIncrementalMode,
//   exports.build,
//   parallel(serve, watchForChanges)
// );

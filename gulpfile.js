var gulp = require("gulp");
var typescript = require("gulp-typescript");

gulp.task("compile:ts", () =>
{
    var options = 
    {
        out: "main.js"
    };

    return gulp.src(["src/ts/*ts"])
    .pipe(typescript(options))
    .js
    .pipe(gulp.dest("dist/js"));
});

gulp.task("default",
[
    "compile:ts"
]);
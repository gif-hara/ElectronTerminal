var gulp = require("gulp");
var typescript = require("gulp-typescript");
var del = require("del");

// TypeScriptをコンパイルする
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

// distフォルダを空にする
gulp.task("clean:dist", function () {
    return del.sync(["dist/*"]);
});

// tsファイルに更新があったらコンパイルする
gulp.task("watch:ts", () =>
{
    return gulp.watch(
        ["src/ts/*ts"],
        [
            "clean:dist",
            "compile:ts"
        ]);
});

gulp.task("default",
[
    "clean:dist",
    "compile:ts",
    "watch:ts"
]);
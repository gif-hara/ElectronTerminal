var gulp = require("gulp");
var typescript = require("gulp-typescript");
var del = require("del");
var electron = require("electron-connect").server.create();

// TypeScriptをコンパイルする
gulp.task("compile:ts", () =>
{
    var options = 
    {
        out: "main.js"
    };

    return gulp
    .src(["src/ts/*ts"])
    .pipe(typescript(options))
    .js
    .pipe(gulp.dest("dist/js"));
});

// distフォルダを空にする
gulp.task("clean:dist", () =>
{
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

// Electronを起動する
gulp.task("electron:start", () =>
{
    electron.start();
});

// Electronを再起動する
gulp.task("electron:restart", () =>
{
    electron.restart();
});

// Electronをリロードする
gulp.task("electron:reload", () =>
{
    electron.reload();
});

// 必要なタイミングでコンパイルを行うタスク
gulp.task("watch",
[
    "clean:dist",
    "compile:ts",
    "watch:ts"
]);

// ビルド
gulp.task("run",
[
    "clean:dist",
    "compile:ts",
    "electron:start"
])
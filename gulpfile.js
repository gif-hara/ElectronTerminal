var gulp = require("gulp");
var typescript = require("gulp-typescript");
var del = require("del");
var electron = require("electron-connect").server.create();
var runSequence = require("run-sequence");
var process = require("process");

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
    return electron.start();
});

// Electronを再起動する
gulp.task("electron:restart", () =>
{
    return electron.restart();
});

// Electronをリロードする
gulp.task("electron:reload", () =>
{
    return electron.reload();
});

// プロセスの終了
gulp.task("process:kill", () =>
{
    return process.exit(0);
});

// 必要なタイミングでコンパイルを行うタスク
gulp.task("watch",
[
    "clean:dist",
    "compile:ts",
    "watch:ts"
]);

// ビルド
gulp.task("run", (callback) =>
{
    return runSequence(
        "clean:dist",
        "compile:ts",
        "electron:start",
        callback);
});

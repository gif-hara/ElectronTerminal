var gulp = require("gulp");
var typescript = require("gulp-typescript");
var del = require("del");
var runSequence = require("run-sequence");
var process = require("process");

var electron = require("electron-connect").server.create(
    {
        path: "./dist"
    }
);

const task =
{
    compile:
    {
        ts:
        {
            main: "compile.ts.main",
            app: "compile.ts.app",
            all: "compile.ts.all",
        },
    },
    copy:
    {
        css: "copy.css",
        html: "copy.html",
        json: "copy.json",
        all: "copy.all",
    },
    clean:
    {
        js:
        {
            main: "clean.js.main",
            app: "clean.js.app",
            all: "clean.js.all",
        },
        all: "clean.all",
    },
    watch:
    {
        compile:
        {
            ts:
            {
                main: "watch.compile.ts.main",
                app: "watch.compile.ts.app",
            }
        },
        copy:
        {
            css: "watch.copy.css",
            html: "watch.copy.html",
            json: "watch.copy.json",
        },
        all: "watch.all",
    },
    electron:
    {
        start: "electron.start",
        reload: "electron.reload",
        restart: "electron.restart",
    },
    process:
    {
        exit: "process.exit",
    },
    run: "run"
};

// Electronエントリーポイントのtsファイルをコンパイルする
gulp.task(task.compile.ts.main, () =>
{
    var options = 
    {
        out: "main/main.js"
    };

    return gulp
    .src(["src/ts/main/*.ts"])
    .pipe(typescript(options))
    .js
    .pipe(gulp.dest("dist/js"));
});

// アプリケーション側のtsファイルをコンパイルする
gulp.task(task.compile.ts.app, () =>
{
    var options = 
    {
        out: "app/index.js"
    };

    return gulp
    .src(["src/ts/app/*.ts"])
    .pipe(typescript(options))
    .js
    .pipe(gulp.dest("dist/js"));
});

// 全てのtsファイルをコンパイルする
gulp.task(task.compile.ts.all,
[
    task.compile.ts.main,
    task.compile.ts.app,
]);

// cssファイルをdistにコピーする
gulp.task(task.copy.css, () =>
{
    return gulp
    .src(["src/css/*.css"])
    .pipe(gulp.dest("dist/css"));
});

// htmlファイルをdistにコピーする
gulp.task(task.copy.html, () =>
{
    return gulp
    .src(["src/html/*.html"])
    .pipe(gulp.dest("dist/html"));
});

// jsonファイルをdistにコピーする
gulp.task(task.copy.json, () =>
{
    return gulp
    .src(["src/*.json"])
    .pipe(gulp.dest("dist"));
});

// コピーが必要なファイル全てをコピーする
gulp.task(task.copy.all,
[
    task.copy.css,
    task.copy.html,
    task.copy.json,
]);

// dist/js/mainフォルダを空にする
gulp.task(task.clean.js.main, () =>
{
    return del.sync(["dist/js/main/*"]);
});

// dist/js/appフォルダを空にする
gulp.task(task.clean.js.app, () =>
{
    return del.sync(["dist/js/app/*"]);
});

// dist/jsフォルダ全てを空にする
gulp.task(task.clean.js.all,
    [
        task.clean.js.main,
        task.clean.js.app,
    ]);

// distの全てのフォルダを空にする
gulp.task(task.clean.all, () =>
{
    return del.sync(["dist/*"]);   
});

// src/ts/mainファイルに更新があったらコンパイルする
gulp.task(task.watch.compile.ts.main, () =>
{
    return gulp.watch(
        ["src/ts/main/*.ts"],
        [task.compile.ts.main]);
});

// src/ts/appファイルに更新があったらコンパイルする
gulp.task(task.watch.compile.ts.app, () =>
{
    return gulp.watch(
        ["src/ts/app/*.ts"],
        [task.compile.ts.app]);
});

// cssファイルに更新があったらdistフォルダにコピーする
gulp.task(task.watch.copy.css, () =>
{
    return gulp
    .watch(["src/css/*.css"], [task.copy.css]);
});

// htmlファイルに更新があったらdistフォルダにコピーする
gulp.task(task.watch.copy.html, () =>
{
    return gulp
    .watch(["src/html/*.html"], [task.copy.html]);
});

// jsonファイルに更新があったらdistフォルダにコピーする
gulp.task(task.watch.copy.json, () =>
{
    return gulp
    .watch(["src/*.json"], [task.copy.json]);
});

// 全てのwatchタスクを起動する　
gulp.task(task.watch.all,
    [
        task.watch.compile.ts.main,
        task.watch.compile.ts.app,
        task.watch.copy.css,
        task.watch.copy.html,
        task.watch.copy.json
    ]);
    
// Electronを起動する
gulp.task(task.electron.start, () =>
{
    return electron.start();
});

// Electronを再起動する
gulp.task(task.electron.restart, () =>
{
    return electron.restart();
});

// Electronをリロードする
gulp.task(task.electron.reload, () =>
{
    return electron.reload();
});

// プロセスの終了
gulp.task(task.process.exit, () =>
{
    return process.exit(0);
});

// ビルド
gulp.task(task.run, (callback) =>
{
    return runSequence(
        [
            task.copy.all,
            task.clean.js.all,
            task.compile.ts.all,
        ],
        task.electron.start,
        callback);
});

var fs = require('fs'),
    gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    uglifyjs = require('gulp-uglifyjs'),
    sass = require('gulp-sass'),
    ts = require('gulp-typescript'),
    tfs = require('gulp-tfs-checkout'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat');

var paths = {
    stylesheets: {
        src: "scss/**/*.scss",
        dest: "content/css/",
        name: "styles"
    },
    javascripts: {
        src: "scripts/bundle/**/*.js",
        dest: "content/scripts/",
        name: "scripts"
    },
    typescripts: {
        src: "app/**/*.ts",
        dest: "content/scripts/",
        name: "app"
    }
};

gulp.task('checkout', function () {
    return gulp.src([
            paths.stylesheets.dest + "*.css",
            paths.javascripts.dest + "*.js"
    ]).pipe(tfs());
});

gulp.task('sass', [], function () {
    var name = paths.stylesheets.name,
        styleCssName = name + ".css",
        styleMinCssName = name + ".min.css",
        src = paths.stylesheets.src,
        dest = paths.stylesheets.dest;

    deleteFile(dest + styleCssName);
    deleteFile(dest + styleMinCssName);

    gulp.src(src)
    .pipe(sass()).on('error', function (evt) { console.log("Error in gulp-sass (normal): " + evt); })
    .pipe(concat(styleCssName))
    .pipe(gulp.dest(dest));

    gulp.src(src)
    .pipe(sass({ outputStyle: "compressed" })).on('error', function (evt) { console.log("Error in gulp-sass (compressed): " + evt); })
    .pipe(concat(styleMinCssName))
    .pipe(gulp.dest(dest));
});

gulp.task('js-bundle', [], function () {
    var name = paths.javascripts.name,
        scriptName = name + '.js',
        scriptMinName = name + '.min.js',
        src = paths.javascripts.src,
        dest = paths.javascripts.dest;

    deleteFile(dest + scriptName);
    deleteFile(dest + scriptMinName);

    gulp.src(src)
    .pipe(concat(scriptName))
    .pipe(gulp.dest(dest))
    .pipe(uglifyjs())
    .pipe(rename(scriptMinName))
	.pipe(gulp.dest(dest));
});

gulp.task('typescript', [], function () {
    var name = paths.typescripts.name,
        jsName = name + ".js",
        minJsName = name + ".min.js",
        src = paths.typescripts.src,
        dest = paths.typescripts.dest;

    deleteFile(dest + jsName);
    deleteFile(dest + minJsName);

    gulp.src(src)
        .pipe(ts({ out: jsName }))
        .js
        .pipe(gulp.dest(dest))
        .pipe(uglifyjs(minJsName, {mangle: false, compress: false}))
	    .pipe(gulp.dest(dest));
    
});

gulp.task('build', ['sass', 'typescript', 'js-bundle']);

gulp.task('default', function () {
    gulp.watch(paths.stylesheets.src, ['sass'])
    .on('change', function (evt) {
        console.log('[watcher] File Sass ' + evt.path + ' was ' + evt.type + ', compiling...');
    });

    gulp.watch(paths.typescripts.src, ['typescript'])
    .on('change', function (evt) {
        console.log('[watcher] File Typescript ' + evt.path + ' was ' + evt.type + ', compiling...');
    });

    gulp.watch(paths.javascripts.src, ['js-bundle'])
    .on('change', function (evt) {
        console.log('[watcher] File Javascript ' + evt.path + ' was ' + evt.type + ', compiling...');
    });
});

function deleteFile(filePath) {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}
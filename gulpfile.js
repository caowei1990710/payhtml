/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are split into several files in the gulp directory
 *  because putting it all here was too long
 */

'use strict';

var fs = require('fs');
var gulp = require('gulp');
// var spritesmith = require('gulp.spritesmith');
// var imagemin = require('gulp-imagemin');
// var pngquant = require('imagemin-pngquant');
/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
fs.readdirSync('./gulp').filter(function (file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function (file) {
  require('./gulp/' + file);
});


// gulp.task('testImagemin', function () {
//   gulp.src('output/*.{png,jpg,gif,ico}')
//     .pipe(imagemin({
//       progressive: true,
//       svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
//       use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
//     }))
//     .pipe(gulp.dest('dist/img'));
// });

gulp.task('sprite', function () {
  var spriteData = gulp.src('src/*.png').pipe(

    ({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    algorithm: 'left-right',
    padding: 4,
    cssTemplate: './sass.html' // 模板
  }));
  return spriteData.pipe(gulp.dest('output/'));
});

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

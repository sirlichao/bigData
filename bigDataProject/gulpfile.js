var gulp = require('gulp'),minifyCss = require('gulp-minify-css');
var jsMinify = require('gulp-minify');
gulp.task('css',function(){
	gulp.src(['css/*.css','css/dataAnalysis/*.css']).pipe(minifyCss({
		advanced:false,
		compatibility:'ie7',
		keepBreaks:true,
		keepSpecialComments:"*"
	}))
	.pipe(gulp.dest('dest/css'))
});

gulp.task('js',function(){
    gulp.src(['js/*.js','js/dataAnalysis/*.css']).pipe(jsMinify())
        .pipe(gulp.dest('dest/js'));
})
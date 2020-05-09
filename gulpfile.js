var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-dart-sass');
var slim        = require('gulp-slim');
var del         = require('del');
var ghPages     = require('gulp-gh-pages');

const src = {
  'path':    'src/',

  'cname':   'src/CNAME',
  'favicon': 'src/assets/favicon/*',
  'fonts':   'src/assets/fonts/**/*',
  'images':  'src/assets/images/**/*',
  'sass':    'src/assets/scss/application.scss',
  'slim':    'src/content/*.slim',
};

const dst = {
  'path':    'dist/',

  'cname':   'dist/',
  'css':     'dist/assets/css',
  'favicon': 'dist/assets/favicon',
  'fonts':   'dist/assets/fonts',
  'html':    'dist/',
  'images':  'dist/assets/images',
  'vendors': 'dist/assets/vendor',
};

const vendors = {
  'js': [
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/jquery/dist/jquery.min.js',
  ],
};

gulp.task('clean', function() {
  return del(dst.path + '**/*');
});

gulp.task('sass', function() {
  return gulp
    .src(src.sass)
    .pipe(sass({
      errLogToConsole: true,
      outputStyle:     'expanded',
      includePaths:    ['src/assets/scss/'],
    }))
    .pipe(gulp.dest(dst.css))
    .pipe(browserSync.stream());
});

gulp.task('slim', function() {
  return gulp
    .src(src.slim)
    .pipe(slim({
      pretty:  true,
      options: 'format=:html',
      require: ['slim/include'],
    }))
    .pipe(gulp.dest(dst.html))
    .on('end', browserSync.reload);
});

['cname', 'favicon', 'fonts', 'images'].forEach(function(type) {
  gulp.task(type, function() {
    return gulp
      .src(src[type])
      .pipe(gulp.dest(dst[type]));
  });
});

gulp.task('vendors-js', function () {
  return gulp.src(vendors['js'])
    .pipe(gulp.dest(dst['vendors'] + '/js'));
});

gulp.task('assets', gulp.parallel(['cname', 'favicon', 'fonts', 'images', 'sass', 'slim', 'vendors-js']));

gulp.task('serve', function (done) {
  browserSync.init({
    server: {
      baseDir: dst.path,
      serveStaticOptions: {
        extensions: ['html'],
      },
    },
  });

  gulp.watch('src/assets/scss/application.scss', gulp.series('sass'));
  gulp.watch('src/assets/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('src/content/**/*.slim', gulp.series('slim'));

  done();
});

gulp.task('compile', gulp.series(['clean', 'assets']));

gulp.task('deploy', gulp.series(['compile', function() {
  return gulp
    .src(dst.path + '**/*')
    .pipe(ghPages({
      'branch': 'master',
      'force':  true,
    }));
  }])
);

gulp.task('default', gulp.series(['compile', 'serve']));

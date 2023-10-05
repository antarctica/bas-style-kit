'use strict';
/*eslint-env node */

var del  = import('del'),
    path = require('path');

var gulp         = require('gulp'),
    pump         = require('pump'),
    map          = require('map-stream'),
    pug          = require('gulp-pug'),
    zip          = require('gulp-zip'),
    sass         = require('gulp-sass')(require('sass')),
    data         = require('gulp-data'),
    concat       = require('gulp-concat'),
    rename       = require('gulp-rename'),
    through      = require('through2'),
    sassvars     = require('gulp-sass-variables'),
    cssprefixer  = require('gulp-class-prefix'),
    frontmatter  = require('front-matter-pug'),
    autoprefixer = require('gulp-autoprefixer');

var bsk_package = require('../package.json');
const bsk_version = bsk_package.version;
const testbed_version = process.env.TESTBED_VERSION

const config = {
  'variables': {
    'bsk-version': bsk_version,
    'testbed-version': testbed_version
  },
  'sources': {
    'source': path.join('.', 'src'),
    'stylesheets': path.join('.', 'src', 'assets', 'stylesheets'),
    'javascripts': path.join('.', 'src', 'assets', 'javascripts'),
    'images': path.join('.', 'src', 'assets', 'images'),
    'samples': path.join('.', 'src', 'samples'),
    'patterns': path.join('.', 'src', 'patterns'),
    'public': path.join('.', 'public')
  },
  'destinations': {
    'root': path.join('.'),
    'public': path.join('.', 'public'),
    'assets': path.join('.', 'public', 'assets'),
    'css': path.join('css'),
    'js': path.join('js'),
    'img': path.join('img'),
    'samples': path.join('.', 'public', 's'),
    'patterns': path.join('.', 'public', 'p')
  },
  'modules': {
    'cssprefixer': {
      'prefix': {
        'app': 'app-',
        'bsk': 'bsk-'
      }
    }
  }
};

var runtime = {
  'samples': [],
  'patterns': {},
  'collections': {}
}

// Task definitions
//
// Tasks build from specific to general. It's likely you will want to run the more generic tasks.

gulp.task('clean--css', cleanCss);
gulp.task('clean--js', cleanJs);
gulp.task('clean--img', cleanImg);
gulp.task('clean--samples', cleanSamples);
gulp.task('clean--patterns', cleanPatterns);
gulp.task('clean--public-archive', cleanPublicArchive);
gulp.task('clean--runtime', cleanRuntime);

gulp.task('build--css-testbed', buildCssTestbed);
gulp.task('build--css-testbed-overrides', buildCssTestbedOverrides);
gulp.task('build--js-testbed', buildJsTestbed);
gulp.task('build--individual-samples', buildSamples);
gulp.task('build--combined-samples', buildSamplesCombined);
gulp.task('build--sample-redirects', buildSampleRedirects);
gulp.task('build--individual-patterns', buildPatterns);
gulp.task('build--pattern-redirects', buildPatternRedirects);
gulp.task('build--index-page', buildIndexPage);
gulp.task('build--error-page', buildErrorPage);
gulp.task('build--legal-pages', buildLegalPages);

gulp.task('copy--img-testbed', copyImagesTestbed);

gulp.task('build--css', gulp.parallel(
  'build--css-testbed',
  'build--css-testbed-overrides'
));
gulp.task('build--js', gulp.parallel(
  'build--js-testbed'
));
gulp.task('copy--img', gulp.parallel(
  'copy--img-testbed'
));

gulp.task('archive--public', archivePublic);

gulp.task('build--samples', gulp.series(
  'build--individual-samples',
  'build--sample-redirects'
));

gulp.task('build--patterns', gulp.series(
  'build--individual-patterns',
  'build--pattern-redirects'
));

gulp.task('build--extras', gulp.series(
  'build--index-page',
  'build--error-page',
  'build--legal-pages'
));
gulp.task('build--pages', gulp.series(
  gulp.parallel(
    'build--samples',
    'build--patterns'
  ),
  'build--extras'
));

gulp.task('watch', watchBuild);

gulp.task('clean', gulp.parallel(
  'clean--css',
  'clean--js',
  'clean--img',
  'clean--samples',
  'clean--patterns',
  'clean--public-archive',
  'clean--runtime'
));
gulp.task('build', gulp.parallel(
  'build--css',
  'build--js',
  'build--pages'
));
gulp.task('copy', gulp.parallel(
  'copy--img'
));
gulp.task('archive', gulp.parallel(
  'archive--public'
));

// Tasks

function cleanCss(done) {
  del([
      path.join(config.destinations.assets, config.destinations.css)
  ]);
  done();
}

function cleanJs(done) {
  del([
      path.join(config.destinations.assets, config.destinations.js)
  ]);
  done();
}

function cleanImg(done) {
  del([
      path.join(config.destinations.assets, config.destinations.img)
  ]);
  done();
}

function cleanSamples(done) {
  del([
      path.join(config.destinations.samples)
  ]);
  done();
}

function cleanPatterns(done) {
  del([
      path.join(config.destinations.patterns)
  ]);
  done();
}

function cleanPublicArchive(done) {
  del([
    path.join(config.destinations.root, 'bas-style-kit-testbed.zip')
  ]);
  done();
}

function cleanRuntime(done) {
  // Reset runtime variables
  runtime.samples = [];
  runtime.patterns = {};
  runtime.collections = {};
  done();
}

function buildCssTestbed(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.stylesheets, 'testbed.scss'),
        path.join(config.sources.stylesheets, 'testbed-samples.scss')
      ]),
      sassvars({
        '$bsk-version': config.variables["bsk-version"],
        '$testbed-version': config.variables["testbed-version"]
      }),
      sass().on('error', sass.logError),
      cssprefixer(config.modules.cssprefixer.prefix.app),
      autoprefixer(config.modules.autoprefixer),
      gulp.dest(path.join(config.destinations.assets, config.destinations.css))
    ],
    done
  );
}

function buildCssTestbedOverrides(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.stylesheets, 'testbed-overrides.scss')
      ]),
      sassvars({
        '$bsk-version': config.variables["bsk-version"],
        '$testbed-version': config.variables["testbed-version"]
      }),
      sass().on('error', sass.logError),
      cssprefixer(config.modules.cssprefixer.prefix.bsk),
      autoprefixer(config.modules.autoprefixer),
      gulp.dest(path.join(config.destinations.assets, config.destinations.css))
    ],
    done
  );
}

function buildJsTestbed(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.javascripts, '**/*.js')
      ]),
      gulp.dest(path.join(config.destinations.assets, config.destinations.js))
    ],
    done
  );
}

function buildSamples(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.samples, '*.pug')
      ]),
      data(function(file) {
        var content = frontmatter(String(file.contents));
        file.contents = new Buffer.from(content.body);

        // Add testbed version as custom attribute
        content.attributes.testbed_version = config.variables["testbed-version"];

        // Add sample number from file name as custom attribute
        var fileName = file.basename.split('--');
        if (fileName.length != 2) {
          throw new Error('Sample file [' + fileName + '] does not fit the expected name format [1234--sample-name]');
        }

        if (!("sample" in content.attributes)) {
          content.attributes.sample = {}
        }
        content.attributes.sample.sample_number = fileName[0];

        return content.attributes;
      }),
      map(sampleIndexer),
      rename({extname: '.html'}),
      pug(),
      gulp.dest(path.join(config.destinations.samples))
    ],
    done
  );
}

function buildSamplesCombined(done) {
  pump(
    [
      gulp.src(path.join(config.sources.public, 's', '*-*.html')),
      concat('samples-combined.html'),
      gulp.dest(path.join(config.destinations.public))
    ],
    done
  );
}

function buildPatterns(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.patterns, '*.pug')
      ]),
      data(function(file) {
        var content = frontmatter(String(file.contents));
        file.contents = new Buffer.from(content.body);

        // Add testbed version as custom attribute
        content.attributes.testbed_version = config.variables["testbed-version"];

        // Add pattern number from file name as custom attribute
        var fileName = file.basename.split('--');
        if (fileName.length != 2) {
          throw new Error('Pattern file [' + fileName + '] does not fit the expected name format [1234--pattern-name]');
        }

        if (!("pattern" in content.attributes)) {
          content.attributes.pattern = {}
        }
        if (!("pattern_variant" in content.attributes)) {
          content.attributes.pattern_variant = {}
        }
        content.attributes.pattern.pattern_number = fileName[0];

        return content.attributes;
      }),
      map(patternIndexer),
      rename({extname: '.html'}),
      pug(),
      gulp.dest(path.join(config.destinations.patterns))
    ],
    done
  );
}

function buildSampleRedirects(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.samples, '*.pug')
      ]),
      data(function(file) {
        var attributes = {};

        // Add testbed version as custom attribute
        attributes.testbed_version = config.variables["testbed-version"]

        // Add sample file name without an extension as custom attribute for target in sample redirect file
        attributes.sample_file_name = file.basename.split('.')[0];

        // Add sample number from sample file name to name sample redirect file
        var fileName = file.basename.split('--');
        if (fileName.length != 2) {
          throw new Error('Sample file [' + fileName + '] does not fit the expected name format [1234--sample-name]');
        }
        attributes.sample_number = fileName[0];

        file.contents = new Buffer.from(`
          <!DOCTYPE html>
          <html lang="en-GB">
            <head>
              <meta charset="utf-8">
              <title>Redirecting&hellip;</title>
              <link rel="canonical" href="./${attributes.sample_file_name}.html">
              <meta http-equiv="refresh" content="0; url=./${attributes.sample_file_name}.html">
              <meta name="robots" content="noindex">
            </head>
            <body>
              <h1>Redirecting&hellip;</h1>
              <a href="./${attributes.sample_file_name}.html">Click here if you are not redirected.</a>
              <script>location="./${attributes.sample_file_name}.html"</script>
            </body>
          </html>`);

        return attributes;
      }),
      through.obj(function(file, enc, cb) {
        // Gulp rename doesn't allow accessing dynamic properties (i.e. from gulp-data) so we have to
        // manually manipulate the file object to rename it.
        //
        // source: https://github.com/hparra/gulp-rename/issues/54#issuecomment-131412099
        file.basename = file.data.sample_number + '.html';
        cb(null, file);
      }),
      gulp.dest(path.join(config.destinations.samples))
    ],
    done
  );
}

function buildPatternRedirects(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.patterns, '*.pug')
      ]),
      data(function(file) {
        var attributes = {};

        // Add testbed version as custom attribute
        attributes.testbed_version = config.variables["testbed-version"]

        // Add sample file name without an extension as custom attribute for target in sample redirect file
        attributes.pattern_file_name = file.basename.split('.')[0];

        // Add sample number from sample file name to name sample redirect file
        var fileName = file.basename.split('--');
        if (fileName.length != 2) {
          throw new Error('Pattern file [' + fileName + '] does not fit the expected name format [1234--pattern-name]');
        }
        attributes.pattern_number = fileName[0];

        file.contents = new Buffer.from(`
          <!DOCTYPE html>
          <html lang="en-GB">
            <head>
              <meta charset="utf-8">
              <title>Redirecting&hellip;</title>
              <link rel="canonical" href="./${attributes.pattern_file_name}.html">
              <meta http-equiv="refresh" content="0; url=./${attributes.pattern_file_name}.html">
              <meta name="robots" content="noindex">
            </head>
            <body>
              <h1>Redirecting&hellip;</h1>
              <a href="./${attributes.pattern_file_name}.html">Click here if you are not redirected.</a>
              <script>location="./${attributes.pattern_file_name}.html"</script>
            </body>
          </html>`);

        return attributes;
      }),
      through.obj(function(file, enc, cb) {
        // Gulp rename doesn't allow accessing dynamic properties (i.e. from gulp-data) so we have to
        // manually manipulate the file object to rename it.
        //
        // source: https://github.com/hparra/gulp-rename/issues/54#issuecomment-131412099
        file.basename = file.data.pattern_number + '.html';
        cb(null, file);
      }),
      gulp.dest(path.join(config.destinations.patterns))
    ],
    done
  );
}

function buildIndexPage(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.source, 'index.pug')
      ]),
      data(function(file) {
        return {
          'samples': runtime.samples,
          'patterns': runtime.patterns,
          'collections': runtime.collections,
          'testbed_version': config.variables["testbed-version"]
        };
      }),
      rename({extname: '.html'}),
      pug(),
      gulp.dest(path.join(config.destinations.public))
    ],
    done
  );
}

function buildErrorPage(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.source, 'error.pug')
      ]),
      data(function(file) {
        return {
          'testbed_version': config.variables["testbed-version"]
        };
      }),
      rename({extname: '.html'}),
      pug(),
      gulp.dest(path.join(config.destinations.public))
    ],
    done
  );
}

function buildLegalPages(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.source, 'legal', '*.pug')
      ]),
      data(function(file) {
        return {
          'testbed_version': config.variables["testbed-version"]
        };
      }),
      rename({extname: '.html'}),
      pug(),
      gulp.dest(path.join(config.destinations.public, 'legal'))
    ],
    done
  );
}

function copyImagesTestbed(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.images, '**/*.jpg'),
        path.join(config.sources.images, '**/*.png'),
        path.join(config.sources.images, '**/*.svg')
      ]),
      gulp.dest(path.join(config.destinations.assets, config.destinations.img))
    ],
    done
  );
}

function archivePublic(done) {
  pump(
    [
      gulp.src([
        path.join(config.sources.public, '**/*.*')
      ]),
      zip('bas-style-kit-testbed.zip'),
      gulp.dest(path.join(config.destinations.root))
    ],
    done
  );
}

function watchBuild(done) {
  gulp.watch(
    [
      path.join(config.sources.source, '**/*.*')
    ],
    gulp.series('clean--runtime', 'build')
  );
  done();
}

// Processing functions

var sampleIndexer = function sampleIndexer(file, cb) {
  if (!('sample' in file.data)) {
    throw new Error('Sample file [' + file.basename + '] does not have a \'sample\' attribute and cannot be indexed');
  }

  // Index each sample's metadata
  runtime.samples.push(file.data.sample);

  // Add each sample to any collections it should belong too (specified by the sample)
  if ('collections' in file.data) {
    file.data.collections.forEach(function(collection) {
        if (!(collection in runtime.collections)) {
          runtime.collections[collection] = []
        }
        runtime.collections[collection].push(file.data.sample);
    });
  }

  cb(null, file);
}

var patternIndexer = function patternIndexer(file, cb) {
  if (!('pattern' in file.data)) {
    throw new Error('Pattern file [' + file.basename + '] does not have a \'pattern\' attribute and cannot be indexed');
  }

  if ('pattern_variant' in file.data) {
    // Create new pattern if needed
    if (!(file.data.pattern.title in runtime.patterns)) {
      runtime.patterns[file.data.pattern.title] = {
        'title': file.data.pattern.title,
        'variants': []
      };
    }

    if (!('variants' in runtime.patterns[file.data.pattern.title])) {
      throw new Error('Pattern [' + file.data.pattern.title + '] has already been added as a standalone pattern. Patterns must either use variants only, or as a (single) direct pattern.');
    }

    var properties = {
      'title': file.data.pattern_variant.title,
      'pattern_number': file.data.pattern.pattern_number
    }
    if (typeof(file.data.pattern_variant.type) !== 'undefined') {
      properties['type'] = file.data.pattern_variant.type
    }
    runtime.patterns[file.data.pattern.title].variants.push(properties);
  } else {
    // Treat pattern as a standalone
    if (file.data.pattern.title in runtime.patterns) {
      throw new Error('Pattern [' + file.data.pattern.title + '] has already been added, either as a duplicate pattern or as a pattern with variants. Patterns must either use variants only, or as a (single) direct pattern.');
    }

    var properties = {
      'title': file.data.pattern.title,
      'pattern_number': file.data.pattern.pattern_number
    }
    if (typeof(file.data.pattern.type) !== 'undefined') {
      properties['type'] = file.data.pattern.type
    }
    runtime.patterns[file.data.pattern.title] = properties;
  }

  cb(null, file);
}

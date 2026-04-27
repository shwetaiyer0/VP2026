

const { src, dest, watch } = require('gulp');
const pug = require('gulp-pug');


/* Convert PUG to HTML */
function processPug() {
    return src('../src/**/*.pug')
    .pipe(
        pug({})
    )
    .pipe(dest('../'));
}

/* Watch the PUG files for changes */
function runGulp() {
    watch('../src/**/*.pug', processPug);
}


exports.views = runGulp;
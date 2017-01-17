const gulp = require("gulp"),
    sass = require("gulp-sass"),
    gutil = require("gutil");


//sass task
gulp.task("sass",()=>{

    gulp.src("./scss/main.scss")
    .pipe(sass().on("error",function(err){

        gutil.log(err);
        this.emit("end");
    }))
    .pipe(gulp.dest("./css"));

});

//watch sas changes
gulp.task("watch-sass",()=>{

    gulp.watch("./scss/**/*.scss",["sass"]);

});

//set default
gulp.task("default",["watch-sass"]);
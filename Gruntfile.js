module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint:{
			all: ['src/**/*.js']
		},
		watch:{
			js:{
				files:['src/js/**/*.js'],
				tasks:['dist']
			}
		},
		concat: {
		    js: { 
		        src: 	'src/js/**/*.js',
		        dest: 	'dist/js/dcylabs.gauge.js'
		    },
		    standalone: {
		        src: 	['bower_components/jquery/dist/jquery.js', 'bower_components/raphael/raphael.js', 'dist/js/dcylabs.gauge.js'],
		        dest: 	'dist/js/standalone/dcylabs.gauge.js'
		    }
		},	
		uglify: {
		    js: { 
		        src: 	'dist/js/dcylabs.gauge.js',
		        dest: 	'dist/js/dcylabs.gauge.min.js' 
		    },
		    standalone: { 
		        src: 	'dist/js/standalone/dcylabs.gauge.js',
		        dest: 	'dist/js/standalone/dcylabs.gauge.min.js' 
		    }		    
		},
		clean: {
		  	dist: ['dist'],
		}					
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('dist', [
		'clean',
		'jshint',
		'concat',
		'uglify'
	]);

}
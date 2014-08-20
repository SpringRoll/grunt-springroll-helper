'use strict';

module.exports = function(grunt)
{
	var _ = require('lodash');

	grunt.registerTask('_spock_usertasks', function(){
		var allTasks = [],
			userTasks = _.filter(grunt.task._tasks, function(task){
				// Grab only the local user tasks
				return !task.multi && !/local Npm module/.test(task.meta.info);
			});
			
		// Format the tasks into an dictionary
		_.each(userTasks, function(task){
			allTasks.push({
				name : task.name,
				info : task.info.replace(/&/g, '&amp;')
					.replace(/'/g, '&apos;')
					.replace(/"/g, '&quot;')
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;')
			});
		});

		// Output the list
		grunt.log.write(JSON.stringify(allTasks));
	});
};
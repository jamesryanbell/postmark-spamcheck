#!/usr/bin/env node
'use strict';

var spamcheck = require('./index');
var Table     = require('cli-table');
var chalk     = require('chalk');
var program   = require('commander');
var fs        = require('fs');

program.unknownOption = program.help;
program
	.usage('[options] <file ...>')
	.version(require('./package').version)
	.option('-f, --file [file]', 'Specify the file path of the email to check')
	.option('-t, --type [type]', 'Specify the type of report (short / long)')
	.parse(process.argv);

program.type = program.type || 'long';

if(!program.file) {
	console.error(chalk.red.bold('You must provide a file to check'));
} else {
	fs.readFile(program.file, 'utf-8', function (err, content) {
		if (err) {
			throw err;
		}
		spamcheck.check({ options: program.type, email: content }, function(info) {
			if(program.type == 'short') {
				console.log(chalk.red('Score: ') + info.score);
				console.log(chalk.red('Score Description: ') + info.scoreDescription);
			} else {
				console.log(chalk.red('Score: ') + info.score);
				console.log(chalk.red('Score Description: ') + info.scoreDescription);

				var table = new Table({
					head: ['Report:'],
					chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': '',
							'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': '',
							'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': '',
							'right': '' , 'right-mid': '' , 'middle': ' ' },
					style: { 'padding-left': 0, 'padding-right': 0 }
				});
				table.push(
					[info.report]
				);
				console.log(table.toString().trim() + "\n");
			}
		});
	});
}

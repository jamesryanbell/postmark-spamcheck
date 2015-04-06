# postmark-spamcheck [![Build Status](https://travis-ci.org/jamesryanbell/postmark-spamcheck.svg?branch=master)](https://travis-ci.org/jamesryanbell/postmark-spamcheck)

> Node library for the Postmark spam API. [http://spamcheck.postmarkapp.com/doc](http://spamcheck.postmarkapp.com/doc)


## Install

```
$ npm install postmark-spamcheck --save
```


## Usage

```js
var fs                = require('fs');
var postmarkSpamcheck = require('postmark-spamcheck');

fs.readFile(filepath, 'utf-8', function (err, content) {
	if (err) {
		throw err;
	}
	postmarkSpamcheck.check({
		options: 'long',
		email: content
	}, function(info) {
		console.log(info.score);
		console.log(info.scoreDescription);
		console.log(info.report);
	});
});

```

## API

### postmarkSpamcheck.check(options, callback)

#### options

##### email

*Required*  
Type: `string`

The raw dump of the email to be filtered, including all headers.

##### options

Type: `string`
Default: `short`

Must either be "long" for a full report of processing rules, or "short" for a score request.

#### callback
Provide a callback to use the information gathered, this will be run once the spam check has been
successfully completed.

## CLI

### Install

```
$ npm install postmark-spamcheck --global
```

### Usage

```
postmark-spamcheck --file <file> --type long

Options:
-h, --help          Output help information
-v, --version       Output version information
-f, --file [file]   Specify the location of the configuration file
-t, --type [type]   Specify the type of report (short | long)

Examples:
postmark-spamcheck --file ./email.txt --type long

```

## License

MIT © [James Bell](https://james-bell.co.uk)

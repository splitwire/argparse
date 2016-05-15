# argparse
This is an argument parser for PhantomJS.  It is very similar to Perl's Getopt::Long module.

USAGE:

First you must inject the file into PhantomJS using phantom.injectJs('argparse.js');

Example:
var injectedJS = phantom.injectJs('argparse.js');

Secondly you have to specify your options within an array.

Example:
var opts = [
    'f|file=s',
    'v|verbose',
    'r'
]

The array must consist of the options you want passed when PhantomJS is ran.  Each pipe '|' separates an alias for the first string before the pipe.  In this example the 'f' is the main argument but it also has an alias 'file' which can be used interchangably for 'f'.  

For instance the user can run the following:
    phantomjs file.js f validation.js OR phantomjs file.js file validation.js
    
The character directly following a '=' will indicate the type of input which is required to follow the argument on the command line when running PhantomJS.  Currently the only two options are 's' for string and 'i' for integer.  An integer that follows an argument will be treated as a string if the opts indicates a string input is required, however, if a string follows an argument that must be an integer an error will be thrown and PhantomJS will exit.

String inputs that are enclosed in single or double quotes will be returned as one string.  A string following an argument flag that is not enclosed in quotes will be returned as a comma separated string.

Arguments that do not have a type specifier will return as true or undefined/false.

For instance phantomjs file.js r will return true when tested for the presence of 'r'.


Examples:

Include a user specified JS file.

var webPage = require('webpage');
var page = webPage.create();

var injectedJS = phantom.injectJs('argparse.js');

var opts = [
    'v|verbose',
    'f|file=s'
];

var args = argparse( opts );

if( args['f'] ) {
    var userJS = phantom.injectJs( args['f'] );
}



Print out a help statement

var webPage = require('webpage');
var page = webPage.create();

var injectedJS = phantom.injectJs('argparse.js');

var opts = [
    'v|verbose',
    'f|file=s',
    'h|help'
];

var args = argparse( opts );

if( args['h'] ) {
    console.log('Help: \nUsage:phantomjs <script>.js <args = v|verbose, f|files, h|help>');
    phantom.exit();
}
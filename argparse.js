var argparse = function( opts ) {
    
    var opt_list = {};
    var opt_types = {};
    var all_opts = [];
    var args = {};
    var OPTIONS = require('system').args

    // PARSE OUT ALL POSSIBLE OPTIONS
    opts.forEach( function(a) {
        var tmp_split = a.split('|');
        opt_list[ tmp_split[0] ] = {};

        tmp_split.forEach(function(aa) {
            opt_list[ tmp_split[0] ][ aa.split('=')[0] ] = a.split('=')[1];
            opt_types[ aa.split('=')[0] ] = a.split('=')[1];
            all_opts.push( aa.split('=')[0] );
        }); 
    });


    Object.keys(opt_list).forEach(function(a) {

        Object.keys( opt_list[a] ).forEach(function(b) {

            if( OPTIONS.indexOf( b ) !== -1 ) {

                var value;
                if( typeof opt_list[a][b] === 'undefined' ) {
                    value = true;
                } else {
                    var idx = OPTIONS.indexOf(b);
                    var type = opt_list[a][b];

                    var v = [];
                    for( var i = idx + 1 ; i < OPTIONS.length; i++ ) { 

                        if( all_opts.indexOf( OPTIONS[i] ) === -1 ) {                
                            v.push( OPTIONS[i] );
                        } else {
                            break;
                        }
                    }

                    if( v.length == 0 ) { 
                        console.log( 'ERROR: No value given for ' + b + '.');
                        phantom.exit();
                    } else {
                        value = v.join();
                    }

                }

                Object.keys( opt_list[a] ).forEach(function(c) {
                    if( value === true ) {
                        args[c] = value;

                    } else {
                        if( opt_types[c] === 's' ) {
                            args[c] = value;
                        } else if( opt_types[c] === 'i' ) {

                            if( isNaN( parseInt(value) )) {
                                console.log( 'ERROR: Input type is not a required integer.');
                                phantom.exit();
                            } else {
                                args[c] = parseInt(value);
                            }

                        } else {
                            console.log( 'ERROR: Unknown value type does not match the required type (' + opt_types[c] + ') for ' + c );
                            phantom.exit();
                        }

                    }

                });

            }

        });

    });

    return args;
    
};


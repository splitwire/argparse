'use strict';

class argparse {
    constructor( opts ){
        this.parseOpts( opts );
    }
    
    
    parseOpts( opts ) {
        var opt_list = {};
        var args = {};
        
        // PARSE OUT ALL POSSIBLE OPTIONS
        opts.forEach( function(a) {
            var tmp_split = a.split('|');
            opt_list[ tmp_split[0] ] = {};
            
            tmp_split.forEach(function(aa) {
                opt_list[ tmp_split[0] ][ aa.split('=')[0] ] = a.split('=')[1];
            }); 
        });
        
        
        console.log( opt_list );
        console.log( args );
        return;
        
        
        Object.keys(opt_list).forEach(function(a) {
            var value;
            console.log( opt_list[a]);
            
            Object.keys( opt_list[a] ).forEach(function(b) {
                console.log( b );
                
                if( OPTIONS.indexOf(b) !== -1 ) {
                    value = true;
                    console.log(b);
                } 
            });
            
        });
        
        return;
        
        Object.keys(opt_list).forEach(function(o) {
            if( OPTIONS.indexOf( o ) !== -1 ) { args[o] = true }    
        });
        
        console.log( opt_list );
 
        
        console.log( args );
        return;
    }
    
    

}

var opts = [
    'v|verbose',
    'n|name=s',
    'h|help',
    'int|integer=i',
    'bugger'
];

var OPTIONS = ['v', 'name', 'int', 'bugger'];

var argP = new argparse( opts );

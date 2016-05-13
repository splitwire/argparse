var args = {};
var opts = [];

function arg_parse() {
  
  if( opts.length == 0 ) { return false; }
  
  var type_def = { 
    's':  { 'type': 'String', 'eval': typeof 's'}, 
    'i':  { 'type': 'Integer', 'eval': typeof 1}, 
  };
  
  var arg_list = config.system.args;
  arg_list.shift();

  opts.forEach( function(opt, i ) {

    // PARSE OUT ARGUMENTS TO ARGS OBJ
    opt.split('|').forEach( function(o, i) { args[o] = false; });
    
    if( opt.indexOf('=') !== -1) {
      var arg_type = opt.split('=')[1];
      
      // VERIFY ARGUMENT TYPE IS ALLOWED
      if( Object.keys(type_def).indexOf( arg_type ) == -1 ) {
        
        //THROW ERROR
        console.log( 'ERROR: "' + arg_type + '" is not an allowed input type.');
        phantom.exit();
        
      }
      
      var value = undefined;
      var just_arg_list = opt.split('=')[0]
      just_arg_list.split('|').forEach( function(o, i) { 
        
        var idx = arg_list.indexOf( o );        
        if( idx !== -1 ) { value = arg_list[ idx + 1 ]; }
        
      });

            
      if ( Object.keys( args ).indexOf( value ) !== -1 ) {
        console.log( 'ERROR: There was an imporperly defined argument.');
        phantom.exit();
      }
      
      
      just_arg_list.split('|').forEach( function(o, i) {
        
        if( type_def[arg_type]['type'] == 'String' ) {
          
          args[o] = value;
          
        } else {

          if( isNaN(value) ) {
            
            console.log( 'ERROR: "' + o + '" must be an integer.');
            phantom.exit();
            
          } else {
            
            args[o] = parseInt(value);
            
          }
          
        }

      });
      
    } else {
      
      Object.keys(args).forEach( function(a, i ) {
        
        if( arg_list.indexOf( a ) !== -1 ) {
          args[a] = true;
        }
        
      })
    }
    
  });
  
}
                 
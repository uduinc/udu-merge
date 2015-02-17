var _ = require( 'lodash' );

/**
 * Gets the type of a variable, returns an all lower-case string
 */
var typeOf = function ( obj )
{
    return ( {} ).toString.call( obj ).match( /\s([a-zA-Z]+)/ )[1].toLowerCase( );
};
var dne = function ( obj )
{
	return ( typeOf( obj ) == 'undefined' || !obj );
};

var udu_merge = udu_merge || {};

udu_merge.overwrite = true; // udu_merge.Overwrites dest data with source data if a conflict happens
udu_merge.replace = false; // Replaces dest data with source data no matter once.




// Later on, I can use _.merge's last parameter (this bind) to bind it with stuff like { paramName: 'sms' }
// This'll allow me to pass an array of fields with overwrite/replace options for specific keys in the objects.




udu_merge.mergeLogic = function ( dest, source )
{
	// console.log( '-------------------mergeLogic' );
	// console.log( 'dest = ', dest );
	// console.log( 'source = ', source );

	// Pre-merge checks
	if ( udu_merge.replace ) {
		// console.log( '-------------------mergeLogic replace' );
		return source;
	}
	if ( _.isUndefined( source ) ) {
		// console.log( '-------------------mergeLogic nosource' );
		return dest;
	}
	if ( !dest ) {
		// console.log( '-------------------mergeLogic nodest' );
		return source;
	}

	// Opinionated merging of dest/source based on their respective types
	if ( typeOf( dest ) !== typeOf( source ) )
	{
		// console.log( '-----Unequal types------' );
		if ( !_.isObject( dest ) )
		{		
			// console.log( 'dest == non-object' );
			// Done
			if ( udu_merge.overwrite ) {
				return source;
			} else {
				return dest;
			}
		}
		else if ( _.isObject( dest ) )
		{
			// console.log( 'dest == object' );
			if ( _.isArray( dest ) )
			{
				// console.log( '-dest == array' );
				// Done
				if ( !_.isObject( source ) ) // source == string/boolean/int
				{
					// console.log( '--source == non-object' );
					dest.push( source );
					return dest;
				}
				else // source == object
				{
					// console.log( '--source == object' );
					if ( udu_merge.overwrite ) {
						return source;
					} else {
						return dest;
					}					
				}
			}
			else // dest is object
			{
				// console.log( '-dest == object' );
				if ( !_.isObject( source ) )
				{
					// console.log( '--source == non-object' );
					if ( udu_merge.overwrite ) {
						return source;
					} else {
						return dest;
					}
				}
				else // source == array
				{
					// console.log( '--source == array' );
					if ( udu_merge.overwrite ) {
						return source;
					} else {
						return dest;
					}						
				}
			}
		}
	}
	// Easy merging, since they're both the same.
	else
	{
		// console.log( '-----Equal Types-----' );
		// Boolean, string etc
		if ( !_.isObject( dest ) )
		{
			// console.log( 'source = ', source );
			// console.log( 'dest = ', dest );
			// console.log( '- Primitives' );
			if ( udu_merge.overwrite ) {
				return source;
			} else {
				return dest;
			}
		}
		else if ( _.isArray ( dest ) )
		{
			// console.log( '- Arrays' );
			return dest.concat( source );
		}
		// We have to merge all this object's properties first.
		else
		{
			// console.log( '- Real objects' );
			// Iterate through source's properties and if they're objects,
			// then we need to perform another merge.
			var keys = _.keys( source );
			// console.log( '--keys = ', keys );
			// console.log( '--source = ', JSON.stringify( source, null, 4 ) );
			var count = 0;
			// console.log( '--Iterating through source and merging source/dest\'s properties' );
			for ( var i = 0; i < keys.length; i++ )
			{
				// console.log( '---count = ', count );
				// dest already has the property we want to add to it.
				if ( _.has( dest, keys[i] ) ) {
					_.merge( dest[keys[i]], source[keys[i]], udu_merge.mergeLogic );
				} else {
					console.log( 'else.' );

					dest[keys[i]] = source[keys[i]];
				}
				console.log();
				++count;
			}
			var thisInt = setInterval( function () { if ( count === keys.length ) { clearInterval( thisInt ); return dest; } }, 50 );
		}
	}
};

udu_merge.merge = function ( dest, source, overwrite, replace )
{
	// console.log( 'got to udumerge' );
	if ( _.isBoolean( overwrite ) ) {
		udu_merge.overwrite = overwrite;
	}
	if ( _.isBoolean( replace ) ) {
		udu_merge.replace = replace;
	}
	console.log( 'overwrite = ', udu_merge.overwrite );
	console.log( 'replace = ', udu_merge.replace );
	_.merge( dest, source, udu_merge.mergeLogic );
};

module.exports = udu_merge;
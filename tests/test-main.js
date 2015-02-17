var uduMerge = require( 'udu-merge' );

var destination =
{
	// 'str': 'there',
	// 'arr': ['lol', 'what'],
	// 'obj': {
	// 	'1': 'keepme',
	// 	'2': 'throwme',
	// 	'obj': {
	// 		'0': 'lol',
	// 		'1': 'keepme',
	// 		'2': 'what'
	// 	}		
	// }
	"udu-query-1" : {
		"_id" : "udu-query-1",
		"status" : "com-ududev-meet_2_send_messages<->udu-2-1",
	}	
};
var newData = 
{
	// 'str': 'up',
	// 'arr': ['well', 'hi'],
/*	'obj': {
		'0': 'lol',
		'2': 'what',
		'obj': {
			'0': 'hi',
			'2': 'bye'
		}
	}*/
	"udu-query-1" : {
		"_id" : "udu-query-1",
		"status" : 0,
		'this':'isfromnew'
	}	
};

console.log( 'OLD destination = ', JSON.stringify( destination ) );
console.log( 'newData = ', JSON.stringify( newData ) );
uduMerge.merge( destination, newData, true );
console.log( 'NEW destination = ', JSON.stringify( destination, null, 4 ) );
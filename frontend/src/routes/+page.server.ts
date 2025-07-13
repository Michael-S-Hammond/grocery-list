export function load({ setHeaders }) {
	// Allow all cross origin for development and testing. This should be refined later.
	setHeaders({
		'Access-Control-Allow-Origin': '*'
	});
	setHeaders({
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
	});
}

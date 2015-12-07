defineJs([], function() {
	//interface
	return {
		loadModel: function( path, callback ) {
			console.log("1111");
			var cLoader = new THREE.ColladaLoader();
			cLoader.load( path, function( c ) {
				var mesh = c.scene;	
				//console.log("modelHelper here");
				//console.log( mesh );
				callback( mesh );
				//callback.call ( this, objcet );			
			});		
		}
	}	
});
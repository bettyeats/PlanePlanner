defineJs([],function(){
	var scene, camera;
	var webglRenderer;
	var zmesh;
	var container;
	
	function init( mesh ) {
    container = document.getElementById( 'model' );
    
    // camera
    camera = new THREE.PerspectiveCamera( 75, container.clientWidth / container.clientHeight, 1, 100000 );
    camera.position.z = 50;

    //scene
    scene = new THREE.Scene();

    // lights
    var ambient = new THREE.AmbientLight( 0x404040 );
    scene.add( ambient );

	var hemiLight = new THREE.HemisphereLight( 0xfafafa, 0x080820 , 0.95 ); // 0xffffbb
	scene.add(hemiLight);
	  
	// renderer
    webglRenderer = new THREE.WebGLRenderer({antialias: true});
    webglRenderer.setSize( container.clientWidth , container.clientHeight );
    webglRenderer.domElement.style.position = "relative";
	webglRenderer.setClearColor(0xffffff, 0.5);
	webglRenderer.sortObjects = false;
    container.appendChild( webglRenderer.domElement );

	//load mesh
	zmesh = mesh;
	zmesh.scale.set(2, 2, 2);
	//zmesh.rotation.set(1.57, 1.57 * 2, 0);
	zmesh.rotation.set(1.57, 1.57 * 2, 0);
	scene.add(zmesh);
	var geometry = new THREE.PlaneGeometry( 60, 60, 32 );
	var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
	//plane = new THREE.Mesh( geometry, material );
	//plane.rotation.set( -Math.PI/2*0.9, 0, 0);
	//plane.position.set(-20, 0, -100);
	//scene.add( plane );	
    }
	
	/*
	function penaltyFunc( eulerAngle ) {
		var newEuler = new THREE.{x:0,y:0,z:0};
		newEuler.x = eulerAngle.x - Math.PI/2;
		newEuler.y = eulerAngle.y;
		newEuler.z = eulerAngle.z;
		console.log(eulerAngle);
		return newEuler;
	}
	*/
	
	function animate() {
      requestAnimationFrame( animate );
      render();
    }
	
	function render() {
		//camera.position.x = camera.position.x + ( 10 - camera.position.x ) * .05;
		//camera.position.y = camera.position.y + ( 10 - camera.position.y ) * .05;
		camera.lookAt( scene.position );
		webglRenderer.render( scene, camera );
	}
			
	return {
		dataInit: function( mesh ) {
			init( mesh );
			animate();		
		},
		
		
		dataUpdate: function( eulerAngle ) {
			// var newEuler = penaltyFunc( eulerAngle );
			if (zmesh !== undefined)
			{
				/*
				var rotation = new THREE.Vector3(1, 1, 1);
				var euler = new THREE.Euler(eulerAngle.y,
					eulerAngle.p,
					eulerAngle.r,
					'XZY');
				rotation.applyEuler(euler);
				*/
				// console.log(JSON.stringify(rotation));
				zmesh.rotation.set(eulerAngle.p - Math.PI / 2, eulerAngle.r, eulerAngle.y);
				
				webglRenderer.render( scene, camera );
			}
		}
	};
	
	
	
});
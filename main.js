requirejs(['legend', 'event-producer'], function() {
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x000);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  new EventProducer(renderer, 'sample-file');
});

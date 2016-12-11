var Legend = function(renderer, eventTypes) {
  this.renderer = renderer;
  this.eventTypes = eventTypes;
  this.init();
};


Legend.prototype.init = function() {
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 10000);
  this.camera.position.z = 5000;

  var mesh;
  var objDecrement = 0;
  var labelDecrement = 0;

  function addLabel(labelText) {
    var legend = $('.legend');
    $('.legend').css('left', window.innerWidth - (Math.floor(window.innerWidth * 0.28)));

    var label = document.createElement('div');
    label.className = 'label';

    label.innerHTML = '<span>' + labelText + '</span>';
    label.style.top = Math.floor(window.innerHeight * 0.75) + labelDecrement + 'px';

    labelDecrement -= Math.floor(window.innerHeight * 0.077);
    $(legend).append(label);
  }

  _.map(this.eventTypes, function(eventType) {
    mesh = new THREE.Object3D();

    mesh.add(new THREE.LineSegments(
      eventType.geometry,
      new THREE.LineBasicMaterial({
        color: eventType.lineColor,
        transparent: true,
        opacity: 0.5
      })
    ));

    material = new THREE.MeshPhongMaterial({
      color: eventType.color,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      shading: THREE.FlatShading
    });

    mesh.add(new THREE.Mesh(eventType.geometry, material));
    mesh.position.y = Math.floor(-2.44 * window.innerHeight) - objDecrement;

    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();

    objDecrement -= Math.floor(window.innerHeight * 0.683);

    this.scene.add(mesh);

    addLabel(eventType.label);
  }.bind(this));

  this.addLights();
};


Legend.prototype.addLights = function() {
  var light1 = new THREE.PointLight(0xffffff, 0.5, 0);
  var light2 = new THREE.PointLight(0xffffff, 0.5, 0);
  var light3 = new THREE.PointLight(0xffffff, 0.5, 0);
  var light4 = new THREE.PointLight(0xffffff, 0.5, 0);
  var light5 = new THREE.PointLight(0xffffff, 0.5, 0);
  var light6 = new THREE.PointLight(0xffffff, 0.5, 0);

  light1.position.set(500, 0, 0);
  light2.position.set(-500, -800, 0);
  light3.position.set(500, 1800, 0);
  light4.position.set(-500, -1800, 0);
  light5.position.set(500, 3800, 0);
  light6.position.set(-500, -3800, 0);

  this.scene.add(light1, light2, light3, light4, light5, light6);
};

var EventProducer = function(renderer, filename) {
  this.renderer = renderer;

  $.getJSON('data/' + filename + '.json').done(function(data) {
    this.data = data;
    this.init();
    this.camera();
    this.orbit();
    this.light();
    this.animate();

    new Activity(data);
  }.bind(this));
};


EventProducer.prototype.init = function() {
  this.scene = new THREE.Scene();
  var objSize = 6;

  var event1 = new THREE.SphereGeometry(objSize, 3, 6, 0, 6.3, 0, 3.1);
  var event1Legend = new THREE.SphereGeometry(200, 3, 6, 0, 6.3, 0, 3.1);

  var event2 = new THREE.SphereGeometry(objSize, 10, 3, 0, 6.3, 0, 3.1);
  var event2Legend = new THREE.SphereGeometry(200, 10, 3, 0, 6.3, 0, 3.1);

  var event3 = new THREE.SphereGeometry(objSize, 3, 13, 0, 6.3, 6, 6.3);
  var event3Legend = new THREE.SphereGeometry(200, 3, 13, 0, 6.3, 6, 6.3);

  var event4 = new THREE.SphereGeometry(objSize, 11, 2, 2, 6.3, 0, 3.1);
  var event4Legend = new THREE.SphereGeometry(200, 11, 2, 2, 6.3, 0, 3.1);

  var event5 = new THREE.DodecahedronGeometry(objSize, 0);
  var event5Legend = new THREE.DodecahedronGeometry(200, 0);

  var event6 = new THREE.TetrahedronGeometry(objSize, 1);
  var event6Legend = new THREE.TetrahedronGeometry(200, 1);

  var event7 = new THREE.OctahedronGeometry(objSize, 0);
  var event7Legend = new THREE.OctahedronGeometry(200, 0);

  var event8 = new THREE.DodecahedronGeometry(objSize, 1);
  var event8Legend = new THREE.DodecahedronGeometry(200, 1);

  var group = new THREE.Group();
  var mesh, x, y, z, geometry, color, lineColor, multiplier, offset, material;
  var eventTypes = {};

  function createPositions(multipliers, offsets) {
    x = Math.random() * multipliers.x - offsets.x;
    y = Math.random() * multipliers.y - offsets.y;
    z = Math.random() * multipliers.z - offsets.z;
  }

  _.map(this.data, function(d) {
    mesh = new THREE.Object3D();

    if (d.n === 'event_1') {
      createPositions( {x: 1000, y: 1000, z: 1000}, {x: 0, y: 0, z: 0} );

      geometry = event1;
      color = 0x00ecff;
      lineColor = 0x15eafb;
      multiplier = 1000;
      offset = 100;

      if (!eventTypes['event_1']) {
        eventTypes['event_1'] = {
          geometry: event1Legend,
          color: color,
          lineColor: lineColor,
          label: 'Event 1'
        };
      }

    } else if (d.n === 'event_2') {
      createPositions( {x: 1000, y: 1000, z: 1000}, {x: 0, y: 0, z: 0} );

      geometry = event2;
      color = 0x0011ff;
      lineColor = 0x3240ff;
      multiplier = 1000;
      offset = 500;

      mesh.add(new THREE.LineSegments(
        event2,
        new THREE.LineBasicMaterial({
          color: lineColor,
          transparent: true,
          opacity: 0.5
        })
      ));

      if (!eventTypes['event_2']) {
        eventTypes['event_2'] = {
          geometry: event2Legend,
          color: color,
          lineColor: lineColor,
          label: 'Event 2'
        };
      }

    } else if (d.n === 'event_3') {
      createPositions( {x: 1000, y: 1000, z: 1000}, {x: 0, y: 0, z: 0} );

      geometry = event3;
      color = 0x9600ff;
      lineColor = 0xbd00ff;
      multiplier = 1000;
      offset = 1000;

      if (!eventTypes['event_3']) {
        eventTypes['event_3'] = {
          geometry: event3Legend,
          color: color,
          lineColor: lineColor,
          label: 'Event 3'
        };
      }

    } else if (d.n === 'event_4') {
      createPositions( {x: 10, y: 10, z: 10}, {x: 10, y: 10, z: 10} );

      geometry = event4;
      color = 0x51ccab;
      lineColor = 0x387e5d;
      multiplier = 1000;
      offset = 100;

      if (!eventTypes['event_4']) {
        eventTypes['event_4'] = {
          geometry: event4Legend,
          color: color,
          lineColor: lineColor,
          label: 'Event 4'
        };
      }

    } else if (d.n === 'event_5') {
      createPositions( {x: 10, y: 10, z: 10}, {x: 10, y: 10, z: 10} );

      geometry = event5;
      color = 0x8db82d;
      lineColor = 0x3f7c49;
      multiplier = 1000;
      offset = 500;

      if (!eventTypes['event_5']) {
        eventTypes['event_5'] = {
          geometry: event5Legend,
          color: color,
          lineColor: lineColor,
          label: 'Event 5'
        };
      }

    } else if (d.n === 'event_6') {
      createPositions( {x: 10, y: 10, z: 10}, {x: 10, y: 10, z: 10} );

      geometry = event6;
      color = 0xa9f208;
      multiplier = 1000;
      offset = 1000;

      if (!eventTypes['event_6']) {
        eventTypes['event_6'] = {
          geometry: event6Legend,
          color: color,
          lineColor: lineColor,
          label: 'Event 6'
        };
      }

    } else if (d.n === 'event_7') {
      createPositions( {x: 2000, y: 2000, z: 2000}, {x: 1000, y: 1000, z: 1000} );

      geometry = event7;
      color = 0xe31313;
      lineColor = 0xff3333;
      multiplier = 100;
      offset = 500;

      if (!eventTypes['event_7']) {
        eventTypes['event_7'] = {
          geometry: event7Legend,
          color: color,
          lineColor: lineColor,
          label: 'Event 7'
        };
      }

    } else if (d.n === 'event_8') {
      createPositions( {x: 2000, y: 2000, z: 2000}, {x: 1000, y: 1000, z: 1000} );

      geometry = event8;
      color = 0x156289;
      lineColor = 0x1b6a92;
      multiplier = 100;
      offset = 2000;

      if (!eventTypes['event_8']) {
        eventTypes['event_8'] = {
          geometry: event8Legend,
          color: color,
          lineColor: lineColor,
          label: 'Other'
        };
      }
    }

    mesh.add(new THREE.LineSegments(
      geometry,
      new THREE.LineBasicMaterial({
        color: lineColor,
        transparent: true,
        opacity: 0.5
      })
    ));

    material = new THREE.MeshPhongMaterial({
      color: color,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      shading: THREE.FlatShading
    });

    mesh.add(new THREE.Mesh(geometry, material));

    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;

    mesh.position.normalize();
    mesh.position.multiplyScalar(Math.random() * multiplier + offset);
    mesh.scale.multiplyScalar(2);
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();

    group.add(mesh);
  }.bind(this));

  this.scene.add(group);
  this.legend = new Legend(this.renderer, eventTypes);

  $('.event-vis').append(this.renderer.domElement);
};


EventProducer.prototype.camera = function() {
  this.userCamera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 10000);
  this.userCamera.position.z = 3500;
};


EventProducer.prototype.orbit = function() {
  this.orbit = new THREE.OrbitControls(this.userCamera, this.renderer.domElement);
  this.orbit.minDistance = 100;
  this.orbit.maxDistance = 3500;

  if (this.autoRotate) {
    this.orbit.autoRotate = true;

    $('.event-vis').on('mousedown', function() {
      this.orbit.autoRotate = false;
    }.bind(this));

    $('.event-vis').on('mouseup', function() {
      this.orbit.autoRotate = true;
    }.bind(this));
  }
};


EventProducer.prototype.light = function() {
  var light1 = new THREE.PointLight(0xffffff, 1, 0);
  light1.position.set(0, 0, 0);

  var light2 = new THREE.PointLight(0xffffff, 1, 0);
  light2.position.set(1000, 2000, 1000);

  var light3 = new THREE.PointLight(0xffffff, 1, 0);
  light3.position.set(-1000, -2000, -1000);

  this.scene.add(light1, light2, light3);
};


EventProducer.prototype.animate = function() {
  var left, bottom, width, height;

  var render = function() {
    left = 0;
    bottom = 0;
    width = Math.floor(window.innerWidth * 0.7);
    height = window.innerHeight;

    this.renderer.setViewport(left, bottom, width, height);
    this.renderer.setScissor(left, bottom, width, height);
    this.renderer.setScissorTest(true);

    this.userCamera.aspect = width / height;
    this.userCamera.lookAt(this.scene.position);
    this.userCamera.updateProjectionMatrix();

    this.renderer.render(this.scene, this.userCamera);

    // Legend
    left = Math.floor(window.innerWidth * 0.73);
    bottom = 0;
    width = Math.floor(window.innerWidth * 0.27);
    height = window.innerHeight;

    this.renderer.setViewport(left, bottom, width, height);
    this.renderer.setScissor(left, bottom, width, height);
    this.renderer.setScissorTest(true);

    this.legend.camera.aspect = width / height;
    this.legend.camera.lookAt(this.legend.scene.position);
    this.legend.camera.updateProjectionMatrix();

    this.renderer.render(this.legend.scene, this.legend.camera);
  }.bind(this);

  requestAnimationFrame(this.animate.bind(this));

  render();
  this.orbit.update();
};

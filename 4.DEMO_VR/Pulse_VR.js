var position_desp_pulse = '17.25 5 6.5';
var position_scaled_pulse = '17.25 2 6.5';
var position_inv_pulse = '17.25 5 8.75';
var position_high_pulse = '17.25 2 8.75';
var position_neg_pulse = '17.25 5 11';

AFRAME.registerComponent('draw-pulse', {
    schema: {
        width: {default: 2},
        height: {default: 1},
        depth: {default: 0.25},
        color: {default: 'DarkKhaki'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
        this.material = new THREE.MeshStandardMaterial({color: data.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);

        el.addEventListener('mousedown', function () {

            this.canvas = document.querySelector("#pulsecanvas");
            this.ctx = this.canvas.getContext('2d');

            this.ctx.beginPath();
            this.ctx.rect(0, 0, 1000, 1000);
            this.ctx.fillStyle = 'white';
            this.ctx.fill();

            // AXIS LINEs
            //AXIS LINE X
            for(x=0; x<400; x += 18) { // 360 steps for entire sine period
                this.ctx.moveTo(x+5,75);  // línea discontinua STARTING POINT
                this.ctx.lineTo(x,75);  // ENDING POINT
            }
            //AXIS LINE Y
            for(y=0; y<400; y += 20) { // 360 steps for entire sine period
                this.ctx.moveTo(150,y+5);  // línea discontinua STARTING POINT
                this.ctx.lineTo(150,y);  // draw ENDING POINT
            }

            // SIGNAL
            this.ctx.moveTo(0,180);  // turn left to draw signal

            for(x=0; x<=400; x+=1) {
                var desp_y = 180;
                var desp_x = 0.0;
                   
                y = desp_y - Math.max(desp_x, 0)*1;

                if (x < 150) {
                    this.ctx.lineTo(x, 75);    
                }
                if ((x >= 150)&&(x<=250)) {
                    this.ctx.lineTo(x, 25);
                }
                if (x > 250) {
                    this.ctx.lineTo(x, 75);
                }
            }
            this.ctx.stroke(); // trace on canvas

            this.texture = new THREE.Texture(this.canvas) 
            this.texture.needsUpdate = true;
            var materials = [
                new THREE.MeshBasicMaterial( { color: 'black' } ), // right
                new THREE.MeshBasicMaterial( { color: 'black' } ), // left
                new THREE.MeshBasicMaterial( { color: 'black' } ), // top
                new THREE.MeshBasicMaterial( { color: 'black' } ), // bottom
                new THREE.MeshBasicMaterial( { map: this.texture } ), // back
                new THREE.MeshBasicMaterial( { color: 'black' } )  // front
            ];
            // this.material = new THREE.MeshBasicMaterial({ map: this.texture });
            this.material = new THREE.MultiMaterial(materials);
            this.mesh = new THREE.Mesh(this.geometry, this.material);

            // el.getObject3D('mesh').material = new THREE.MeshBasicMaterial({ map: this.texture });
            el.getObject3D('mesh').material = new THREE.MultiMaterial(materials);
        });
    }
});

///////////////////////////////////////////////////////////

AFRAME.registerComponent('desp-pulse', {
    schema: {
        width: {default: 2},
        height: {default: 1},
        depth: {default: 0.25},
        color: {default: 'black'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
        this.material = new THREE.MeshStandardMaterial({color: data.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);

        var mod_desp = -100;

        el.addEventListener('mousedown', function () {

            this.canvas = document.querySelector("#despcanvas");
            this.ctx = this.canvas.getContext('2d');

            this.ctx.beginPath();
            this.ctx.rect(0, 0, 1000, 1000);
            this.ctx.fillStyle = 'white';
            this.ctx.fill();

            // AXIS LINEs
            //AXIS LINE X
            for(x=0; x<400; x += 18) { // 360 steps for entire sine period
                this.ctx.moveTo(x+5,75);  // línea discontinua STARTING POINT
                this.ctx.lineTo(x,75);  // ENDING POINT
            }
            //AXIS LINE Y
            for(y=0; y<400; y += 20) { // 360 steps for entire sine period
                this.ctx.moveTo(150,y+5);  // línea discontinua STARTING POINT
                this.ctx.lineTo(150,y);  // draw ENDING POINT
            }

            // SIGNAL
            this.ctx.moveTo(0,180);  // turn left to draw signal

            // generate random number between -100 y 100
            var minlimit = -100;
            var maxlimit = 250;
            var randomNum = Math.floor(Math.random() * (maxlimit)) + (minlimit);
            
            mod_desp = mod_desp + randomNum;
            if ((mod_desp <= -300) || (mod_desp >= 300)) {
                mod_desp = -100;
                randomNum = 0;
            }
            
            if (this.scene != null) {
                this.scene.removeChild(this.box);
            } 
            if (this.box != null) {
                this.box.removeChild(this.text);
            }
            
            this.scene = document.querySelector('a-scene');
            this.box = document.createElement('a-box');
            this.box.setAttribute('position', position_desp_pulse);
            this.box.setAttribute('rotation', '0 -90 0');
            this.box.setAttribute('width','1px');
            this.box.setAttribute('height','0.5px');
            this.box.setAttribute('depth','0.15px');
            this.box.setAttribute('color', 'white');
            this.scene.appendChild(this.box);
                        
            this.text = document.createElement('a-text');

            var sign = '';
            if (randomNum => 0) {
                sign = ' + ';
                randomNum = randomNum;
            } 
            if (randomNum < 0){
                sign = ' - ';
                randomNum = -randomNum;
            }

            this.text.setAttribute('value', "y(t) = x(t" + sign + randomNum + "to)");
            this.text.setAttribute('color', 'red');
            this.text.setAttribute('position', '-0.4 0 0.1');
            this.text.setAttribute('scale', '0.55 0.55 0.55');
            this.box.appendChild(this.text);

            for(x=0; x<=400; x+=1) {
                var desp_y = 180;
                var desp_x = 0.0;
                   
                y = desp_y - Math.max(desp_x, 0)*1; // Modify high

                if (x < 0 - mod_desp) {
                    this.ctx.lineTo(0, 75);
                }
                if ((x >= 0 - mod_desp)&&(x < 50 - mod_desp)) {
                    // this.ctx.moveTo(x, 75);
                    this.ctx.lineTo(x, 75);    
                }
                if ((x >= 50 - mod_desp)&&(x <= 150 - mod_desp)) {
                    // this.ctx.moveTo(x, 75);
                    this.ctx.lineTo(x, 25);
                }
                if (x > 150 - mod_desp) {
                    // this.ctx.moveTo(x, 75)
                    this.ctx.lineTo(x, 75);
                }
            }
            this.ctx.stroke(); // trace on canvas

            this.texture = new THREE.Texture(this.canvas) 
            this.texture.needsUpdate = true;
            var materials = [
                new THREE.MeshBasicMaterial( { color: 'black' } ), // right
                new THREE.MeshBasicMaterial( { color: 'black' } ), // left
                new THREE.MeshBasicMaterial( { color: 'black' } ), // top
                new THREE.MeshBasicMaterial( { color: 'black' } ), // bottom
                new THREE.MeshBasicMaterial( { map: this.texture } ), // back
                new THREE.MeshBasicMaterial( { color: 'black' } )  // front
            ];
            // this.material = new THREE.MeshBasicMaterial({ map: this.texture });
            this.material = new THREE.MultiMaterial(materials);
            this.mesh = new THREE.Mesh(this.geometry, this.material);

            // el.getObject3D('mesh').material = new THREE.MeshBasicMaterial({ map: this.texture });
            el.getObject3D('mesh').material = new THREE.MultiMaterial(materials);

            mod_desp = -100;
        });
    }
});

AFRAME.registerComponent('scaled-pulse', {
    schema: {
        width: {default: 2},
        height: {default: 1},
        depth: {default: 0.25},
        color: {default: 'black'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
        this.material = new THREE.MeshStandardMaterial({color: data.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);

        var mod_scaled = 0;

        el.addEventListener('mousedown', function () {

            this.canvas = document.querySelector("#scaledcanvas");
            this.ctx = this.canvas.getContext('2d');

            this.ctx.beginPath();
            this.ctx.rect(0, 0, 1000, 1000);
            this.ctx.fillStyle = 'white';
            this.ctx.fill();

            // AXIS LINEs
            //AXIS LINE X
            for(x=0; x<400; x += 18) { // 360 steps for entire sine period
                this.ctx.moveTo(x+5,75);  // línea discontinua STARTING POINT
                this.ctx.lineTo(x,75);  // ENDING POINT
            }
            //AXIS LINE Y
            for(y=0; y<400; y += 20) { // 360 steps for entire sine period
                this.ctx.moveTo(150,y+5);  // línea discontinua STARTING POINT
                this.ctx.lineTo(150,y);  // draw ENDING POINT
            }

            // SIGNAL
            this.ctx.moveTo(0,180);  // turn left to draw signal

            // generate random number between -30 y 60
            var minlimit = -30;
            var maxlimit = 60;
            var randomNum = Math.floor(Math.random() * (maxlimit)) + (minlimit);
            
            mod_scaled = randomNum;
            if ((mod_scaled < -30) || (mod_scaled > 25)) {
                mod_scaled = 0;
                randomNum = 0;
            }
            
            if (this.scene != null) {
                this.scene.removeChild(this.box);
            } 
            if (this.box != null) {
                this.box.removeChild(this.texto);
            }
            
            this.scene = document.querySelector('a-scene');
            this.box = document.createElement('a-box');
            this.box.setAttribute('position', position_scaled_pulse);
            this.box.setAttribute('rotation', '0 -90 0');
            this.box.setAttribute('width','1px');
            this.box.setAttribute('height','0.5px');
            this.box.setAttribute('depth','0.15px');
            this.box.setAttribute('color', 'white');
            this.scene.appendChild(this.box);
                        
            this.texto = document.createElement('a-text');

            // var signo = '';
            if (randomNum => 0) {
                // signo = ' + ';
                randomNum = randomNum;
            } 
            if (randomNum < 0){
                // signo = ' - ';
                randomNum = -randomNum;
            }

            if (mod_scaled < 0) {
                var result = "y(t) = x(" + randomNum + "t)";
            } else if (mod_scaled > 0) {
                var result = "y(t) = x(t/" + randomNum + ")";
            } else {
                var result = "y(t) = x(t)";
            }

            this.texto.setAttribute('value', result);
            this.texto.setAttribute('color', 'red');
            this.texto.setAttribute('position', '-0.4 0 0.1');
            this.texto.setAttribute('scale', '0.7 0.7 0.7');
            this.box.appendChild(this.texto);            

            for(x=0; x<=400; x+=1) {
                var desp_y = 180;
                var desp_x = 0.0;
                var mod_desp = 0;
                   
                y = desp_y - Math.max(desp_x, 0)*1; // Modify high

                if (x < 100 + mod_desp) {
                    this.ctx.lineTo(0, 75);
                }
                if ((x >= 100 + mod_desp)&&(x < 150 + mod_desp)) {
                    // this.ctx.moveTo(x, 75);
                    this.ctx.lineTo(x + mod_scaled, 75);    
                }
                if ((x >= 150 + mod_desp)&&(x < 200 + mod_desp)) {
                    // this.ctx.moveTo(x, 75);
                    this.ctx.lineTo(x + mod_scaled, 25);
                }
                if ((x >= 200 + mod_desp)&&(x <= 250 + mod_desp)) {
                    // this.ctx.moveTo(x, 75);
                    this.ctx.lineTo(x - mod_scaled, 25);
                }
                if (x > 250 + mod_desp) {
                    // this.ctx.moveTo(x, 75)
                    this.ctx.lineTo(x - mod_scaled, 75);
                }
            }
            this.ctx.stroke(); // trace on canvas

            this.texture = new THREE.Texture(this.canvas) 
            this.texture.needsUpdate = true;
            var materials = [
                new THREE.MeshBasicMaterial( { color: 'black' } ), // right
                new THREE.MeshBasicMaterial( { color: 'black' } ), // left
                new THREE.MeshBasicMaterial( { color: 'black' } ), // top
                new THREE.MeshBasicMaterial( { color: 'black' } ), // bottom
                new THREE.MeshBasicMaterial( { map: this.texture } ), // back
                new THREE.MeshBasicMaterial( { color: 'black' } )  // front
            ];
            // this.material = new THREE.MeshBasicMaterial({ map: this.texture });
            this.material = new THREE.MultiMaterial(materials);
            this.mesh = new THREE.Mesh(this.geometry, this.material);

            // el.getObject3D('mesh').material = new THREE.MeshBasicMaterial({ map: this.texture });;
            el.getObject3D('mesh').material = new THREE.MultiMaterial(materials);
        });
    }
});

AFRAME.registerComponent('inv-pulse', {
    schema: {
        width: {default: 2},
        height: {default: 1},
        depth: {default: 0.25},
        color: {default: 'black'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
        this.material = new THREE.MeshStandardMaterial({color: data.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);

        var count = 0;

        el.addEventListener('mousedown', function () {

            this.canvas = document.querySelector("#invcanvas");
            this.ctx = this.canvas.getContext('2d');

            this.ctx.beginPath();
            this.ctx.rect(0, 0, 1000, 1000);
            this.ctx.fillStyle = 'white';
            this.ctx.fill();

            var mod_inv = 50;

            // AXIS LINEs
            //AXIS LINE X
            for(x=0; x<400; x += 18) { // 360 steps for entire sine period
                this.ctx.moveTo(x+5,75);  // línea discontinua STARTING POINT
                this.ctx.lineTo(x,75);  // ENDING POINT
            }
            //AXIS LINE Y
            for(y=0; y<400; y += 20) { // 360 steps for entire sine period
                this.ctx.moveTo(150, y+5);  // línea discontinua STARTING POINT
                this.ctx.lineTo(150, y);  // draw ENDING POINT
            }

            // SIGNAL
            this.ctx.moveTo(0,180);  // turn left to draw signal

/*             if (mod_inv != 0) {
               var mod_inv = mod_inv - 50;
            } */

            if (this.scene != null) {
                this.scene.removeChild(this.box);
            } 
            if (this.box != null) {
                this.box.removeChild(this.text);
            }
            
            if (count % 2 == 0) { // Count pair --> x(-t)
                this.scene = document.querySelector('a-scene');
                this.box = document.createElement('a-box');
                this.box.setAttribute('position', position_inv_pulse);
                this.box.setAttribute('rotation', '0 -90 0');
                this.box.setAttribute('width','1px');
                this.box.setAttribute('height','0.5px');
                this.box.setAttribute('depth','0.15px');
                this.box.setAttribute('color', 'white');
                this.scene.appendChild(this.box);
                            
                this.text = document.createElement('a-text');

                this.text.setAttribute('value', "y(t) = x(-t)");
                this.text.setAttribute('color', 'red');
                this.text.setAttribute('position', '-0.4 0 0.1');
                this.text.setAttribute('scale', '0.75 0.75 0.75');
                this.box.appendChild(this.text);

                for(x=0; x<=400; x+=1) {
                    var desp_y = 180;
                    var desp_x = 0.0;
                    var mod_desp = 0;
                    var mod_scaled = 0;
                    
                    y = desp_y - Math.max(desp_x + mod_scaled, 0)*1; // Modify high

                    if (x < -50 + mod_desp + mod_inv) {
                        this.ctx.lineTo(0, 75);
                    }
                    if ((x >= -50 + mod_desp + mod_inv)&&(x < 0 + mod_desp + mod_inv)) {
                        // this.ctx.moveTo(x, 75);
                        this.ctx.lineTo(x, 75);    
                    }
                    if ((x >= 0 + mod_desp + mod_inv)&&(x <= 100 + mod_desp + mod_inv)) {
                        // this.ctx.moveTo(x, 75);
                        this.ctx.lineTo(x, 25);
                    }
                    if (x > 100 + mod_desp + mod_inv) {
                        // this.ctx.moveTo(x, 75)
                        this.ctx.lineTo(x, 75);
                    }
                }
            } else { // Count odd --> x(t)
                this.scene = document.querySelector('a-scene');
                this.box = document.createElement('a-box');
                this.box.setAttribute('position', position_inv_pulse);
                this.box.setAttribute('rotation', '0 -90 0');
                this.box.setAttribute('width','1px');
                this.box.setAttribute('height','0.5px');
                this.box.setAttribute('depth','0.15px');
                this.box.setAttribute('color', 'white');
                this.scene.appendChild(this.box);
                            
                this.text = document.createElement('a-text');

                this.text.setAttribute('value', "y(t) = x(t)");
                this.text.setAttribute('color', 'black');
                this.text.setAttribute('position', '-0.4 0 0.1');
                this.text.setAttribute('scale', '0.75 0.75 0.75');
                this.box.appendChild(this.text);

                for(x=0; x<=400; x+=1) {
                    var desplazamiento_y = 180;
                    var desplazamiento_x = 0.0;
                    var mod_desp = -100;

                    y = desplazamiento_y - Math.max(desplazamiento_x, 0)*1; // Modify high

                    if (x < 0 - mod_desp) {
                        this.ctx.lineTo(0, 75);
                    }
                    if ((x >= 0 - mod_desp)&&(x < 50 - mod_desp)) {
                        // this.ctx.moveTo(x, 75);
                        this.ctx.lineTo(x, 75);    
                    }
                    if ((x >= 50 - mod_desp)&&(x <= 150 - mod_desp)) {
                        // this.ctx.moveTo(x, 75);
                        this.ctx.lineTo(x, 25);
                    }
                    if (x > 150 - mod_desp) {
                        // this.ctx.moveTo(x, 75)
                        this.ctx.lineTo(x, 75);
                    }
                }
            }

            this.ctx.stroke(); // trace on canvas

            this.texture = new THREE.Texture(this.canvas) 
            this.texture.needsUpdate = true;
            var materials = [
                new THREE.MeshBasicMaterial( { color: 'black' } ), // right
                new THREE.MeshBasicMaterial( { color: 'black' } ), // left
                new THREE.MeshBasicMaterial( { color: 'black' } ), // top
                new THREE.MeshBasicMaterial( { color: 'black' } ), // bottom
                new THREE.MeshBasicMaterial( { map: this.texture } ), // back
                new THREE.MeshBasicMaterial( { color: 'black' } )  // front
            ];
            // this.material = new THREE.MeshBasicMaterial({ map: this.texture });
            this.material = new THREE.MultiMaterial(materials);
            this.mesh = new THREE.Mesh(this.geometry, this.material);

            // el.getObject3D('mesh').material = new THREE.MeshBasicMaterial({ map: this.texture });;
            el.getObject3D('mesh').material = new THREE.MultiMaterial(materials);

            count++;
        });
    }
});

AFRAME.registerComponent('high-pulse', {
    schema: {
        width: {default: 2},
        height: {default: 1},
        depth: {default: 0.25},
        color: {default: 'black'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
        this.material = new THREE.MeshStandardMaterial({color: data.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);
        
        var mod_high = 0;

        el.addEventListener('mousedown', function () {

            this.canvas = document.querySelector("#highcanvas");
            this.ctx = this.canvas.getContext('2d');

            this.ctx.beginPath();
            this.ctx.rect(0, 0, 1000, 1000);
            this.ctx.fillStyle = 'white';
            this.ctx.fill();

            var mod_inv = 0;

            // AXIS LINEs
            // AXIS LINE X
            for(x=0; x<400; x += 18) { // 360 steps for entire sine period
                this.ctx.moveTo(x+5,75);  // línea discontinua STARTING POINT
                this.ctx.lineTo(x,75);  // ENDING POINT
            }
            //AXIS LINE Y
            for(y=0; y<400; y += 20) { // 360 steps for entire sine period
                this.ctx.moveTo(150,y+5);  // línea discontinua STARTING POINT
                this.ctx.lineTo(150,y);  // draw ENDING POINT
            }

            // SIGNAL
            this.ctx.moveTo(0,180);  // turn left to draw signal

            // generate random number between -40 y 75
            var minlimit = -75;
            var maxlimit = 125;
            var randomNum = Math.floor(Math.random() * (maxlimit)) + (minlimit);
            
            mod_high = randomNum;
            if ((mod_high < -75) || (mod_high > 125)) {
                mod_high = 0;
                randomNum = 0;
            }
            
            if (this.scene != null) {
                this.scene.removeChild(this.box);
            } 
            if (this.box != null) {
                this.box.removeChild(this.text);
            }
            
            this.scene = document.querySelector('a-scene');
            this.box = document.createElement('a-box');
            this.box.setAttribute('position', position_high_pulse);
            this.box.setAttribute('rotation', '0 -90 0');
            this.box.setAttribute('width','1px');
            this.box.setAttribute('height','0.5px');
            this.box.setAttribute('depth','0.15px');
            this.box.setAttribute('color', 'white');
            this.scene.appendChild(this.box);
                        
            this.text = document.createElement('a-text');

            var sign = '';
            if (randomNum => 0) {
                sign = ' + ';
                randomNum = randomNum;
            } 
            if (randomNum < 0){
                sign = ' - ';
                randomNum = -randomNum;
            }

            this.text.setAttribute('value', "y(t) = x(t) " + sign + " " + randomNum);
            this.text.setAttribute('color', 'red');
            this.text.setAttribute('position', '-0.4 0 0.1');
            this.text.setAttribute('scale', '0.6 0.6 0.6');
            this.box.appendChild(this.text); 

            if (mod_inv != 0) {
               var mod_inv = mod_inv - 50;
            }

            for(x=0; x<=400; x+=1) {
                var desp_y = 180;
                var desp_x = 0.0;
                var mod_desp = 0;
                var mod_scaled = 0;
                   
                y = desp_y - Math.max(desp_x + mod_scaled, 0)*1; // Modify ampli

                if (x < 100 - mod_desp + mod_inv) {
                    this.ctx.lineTo(0, 75 - mod_high);
                }
                if ((x >= 100 - mod_desp + mod_inv)&&(x < 150 - mod_desp + mod_inv)) {
                    // this.ctx.moveTo(x, 75);
                    this.ctx.lineTo(x, 75 - mod_high);    
                }
                if ((x >= 150 - mod_desp + mod_inv)&&(x <= 250 - mod_desp + mod_inv)) {
                    // this.ctx.moveTo(x, 75);
                    this.ctx.lineTo(x, 25 - mod_high);
                }
                if (x > 250 - mod_desp + mod_inv) {
                    // this.ctx.moveTo(x, 75)
                    this.ctx.lineTo(x, 75 - mod_high);
                }
            }
            this.ctx.stroke(); // trace on canvas

            this.texture = new THREE.Texture(this.canvas) 
            this.texture.needsUpdate = true;
            var materials = [
                new THREE.MeshBasicMaterial( { color: 'black' } ), // right
                new THREE.MeshBasicMaterial( { color: 'black' } ), // left
                new THREE.MeshBasicMaterial( { color: 'black' } ), // top
                new THREE.MeshBasicMaterial( { color: 'black' } ), // bottom
                new THREE.MeshBasicMaterial( { map: this.texture } ), // back
                new THREE.MeshBasicMaterial( { color: 'black' } )  // front
            ];
            // this.material = new THREE.MeshBasicMaterial({ map: this.texture });
            this.material = new THREE.MultiMaterial(materials);
            this.mesh = new THREE.Mesh(this.geometry, this.material);

            // el.getObject3D('mesh').material = new THREE.MeshBasicMaterial({ map: this.texture });;
            el.getObject3D('mesh').material = new THREE.MultiMaterial(materials);
        });
    }
});

AFRAME.registerComponent('neg-pulse', {
    schema: {
        width: {default: 2},
        height: {default: 1},
        depth: {default: 0.25},
        color: {default: 'black'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
        this.material = new THREE.MeshStandardMaterial({color: data.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);

        var count = 0;

        el.addEventListener('mousedown', function () {

            this.canvas = document.querySelector("#negcanvas");
            this.ctx = this.canvas.getContext('2d');

            this.ctx.beginPath();
            this.ctx.rect(0, 0, 1000, 1000);
            this.ctx.fillStyle = 'white';
            this.ctx.fill();

            // AXIS LINEs
            //AXIS LINE X
            for(x=0; x<400; x += 18) { // 360 steps for entire sine period
                this.ctx.moveTo(x+5, 75);  // línea discontinua STARTING POINT
                this.ctx.lineTo(x, 75);  // ENDING POINT
            }
            //AXIS LINE Y
            for(y=0; y<400; y += 20) { // 360 steps for entire sine period
                this.ctx.moveTo(150,y+5);  // línea discontinua STARTING POINT
                this.ctx.lineTo(150,y);  // draw ENDING POINT
            }

            // SIGNAL
            this.ctx.moveTo(0,180);  // turn left to draw signal

            if (this.scene != null) {
                this.scene.removeChild(this.box);
            } 
            if (this.box != null) {
                // this.box.removeChild(this.texto);
            }

            if (count % 2 == 0) { // Count pair --> -x(t)
                this.scene = document.querySelector('a-scene');
                this.box = document.createElement('a-box');
                this.box.setAttribute('position', position_neg_pulse);
                this.box.setAttribute('rotation', '0 -90 0');
                this.box.setAttribute('width','1px');
                this.box.setAttribute('height','0.5px');
                this.box.setAttribute('depth','0.15px');
                this.box.setAttribute('color', 'white');
                this.box.setAttribute('border-width', '0.5px');
                this.box.setAttribute('border-style', 'solid');
                this.box.setAttribute('border-color', 'red');
                this.scene.appendChild(this.box);
                                
                this.text = document.createElement('a-text');

                this.text.setAttribute('value', "y(t) = -x(t)");
                this.text.setAttribute('color', 'red');
                this.text.setAttribute('position', '-0.4 0 0.1');
                this.text.setAttribute('scale', '0.8 0.8 0.8');
                this.box.appendChild(this.text);

                for(x=0; x<=400; x+=1) {
                    var desplazamiento_y = 180;
                    var desplazamiento_x = 0.0;
                    
                    y = desplazamiento_y - Math.max(desplazamiento_x, 0)*1;

                    if (x < 150) {
                        this.ctx.lineTo(x, 75);    
                    }
                    if ((x >= 150)&&(x <= 250)) {
                        this.ctx.lineTo(x, 125);
                    }
                    if (x > 250) {
                        this.ctx.lineTo(x, 75);
                    }
                }
                
            } else { // Count odd --> x(t)
                this.scene = document.querySelector('a-scene');
                this.box = document.createElement('a-box');
                this.box.setAttribute('position', position_neg_pulse);
                this.box.setAttribute('rotation', '0 -90 0');
                this.box.setAttribute('width','1px');
                this.box.setAttribute('height','0.5px');
                this.box.setAttribute('depth','0.15px');
                this.box.setAttribute('color', 'white');
                this.box.setAttribute('border-width', '0.5px');
                this.box.setAttribute('border-style', 'solid');
                this.box.setAttribute('border-color', 'red');
                this.scene.appendChild(this.box);
                                
                this.text = document.createElement('a-text');

                this.text.setAttribute('value', "y(t) = x(t)");
                this.text.setAttribute('color', 'black');
                this.text.setAttribute('position', '-0.4 0 0.1');
                this.text.setAttribute('scale', '0.8 0.8 0.8');
                this.box.appendChild(this.text);

                for(x=0; x<=400; x+=1) {
                    var desplazamiento_y = 180;
                    var desplazamiento_x = 0.0;
                    
                    y = desplazamiento_y - Math.max(desplazamiento_x, 0)*1;

                    if (x < 150) {
                        this.ctx.lineTo(x, 75);    
                    }
                    if ((x >= 150)&&(x <= 250)) {
                        this.ctx.lineTo(x, 25);
                    }
                    if (x > 250) {
                        this.ctx.lineTo(x, 75);
                    }
                }
            }
            this.ctx.stroke(); // trace on canvas

            this.texture = new THREE.Texture(this.canvas) 
            this.texture.needsUpdate = true;
            var materials = [
                new THREE.MeshBasicMaterial( { color: 'black' } ), // right
                new THREE.MeshBasicMaterial( { color: 'black' } ), // left
                new THREE.MeshBasicMaterial( { color: 'black' } ), // top
                new THREE.MeshBasicMaterial( { color: 'black' } ), // bottom
                new THREE.MeshBasicMaterial( { map: this.texture } ), // back
                new THREE.MeshBasicMaterial( { color: 'black' } )  // front
            ];
            // this.material = new THREE.MeshBasicMaterial({ map: this.texture });
            this.material = new THREE.MultiMaterial(materials);
            this.mesh = new THREE.Mesh(this.geometry, this.material);

            // el.getObject3D('mesh').material = new THREE.MeshBasicMaterial({ map: this.texture });;
            el.getObject3D('mesh').material = new THREE.MultiMaterial(materials);

            count++;
        });
    }
});
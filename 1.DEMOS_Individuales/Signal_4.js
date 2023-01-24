var position_desp_signal_4 = '-5 22 0.5';
var position_scaled_signal_4 = '-5 8 0.5';
var position_inv_signal_4 = '5 22 0.5';
var position_high_signal_4 = '5 8 0.5';
var position_neg_signal_4 = '15 22 0.5';

AFRAME.registerComponent('draw-signal_4', {
    schema: {
        width: {default: 9},
        height: {default: 4.5},
        depth: {default: 1},
        color: {default: 'DarkBlue'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
        this.material = new THREE.MeshStandardMaterial({color: data.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);

        el.addEventListener('mousedown', function () {

            this.canvas = document.querySelector("#signal4canvas");
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
                this.ctx.moveTo(150, y+5);  // línea discontinua STARTING POINT
                this.ctx.lineTo(150, y);  // draw ENDING POINT
            }

            // SIGNAL
            this.ctx.moveTo(0,180);  // turn left to draw signal

            for(x=0; x<=400; x+=1) {
                var desp_y = 180;
                var desp_x = 0.0;
                   
                y = desp_y - Math.max(desp_x, 0)*1;
                
                if (x < 70) {
                    this.ctx.lineTo(x, 75);    
                }
                if ((x >= 70)&&(x < 100)) {
                    this.ctx.lineTo(x, 25);    
                }
                if ((x >= 100)&&(x <= 150)) {
                    this.ctx.lineTo(x, 50);
                }
                if ((x >= 150)&&(x <= 170)) {
                    this.ctx.lineTo(x, 75);
                }
                if ((x > 170)&&(x <= 250)) {
                    this.ctx.lineTo(x, 100);
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

AFRAME.registerComponent('desp-signal_4', {
    schema: {
        width: {default: 9},
        height: {default: 4.5},
        depth: {default: 1},
        color: {default: 'black'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
        this.material = new THREE.MeshStandardMaterial({color: data.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);

        var mod_desp = 0;

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
                this.ctx.moveTo(150, y+5);  // línea discontinua STARTING POINT
                this.ctx.lineTo(150, y);  // draw ENDING POINT
            }

            // SIGNAL
            this.ctx.moveTo(0,180);  // turn left to draw signal

            // generate random number between -100 to 200
            var minlimit = -100;
            var maxlimit = 200;
            var randomNum = Math.floor(Math.random() * (maxlimit)) + (minlimit);
            // console.log("Random number = " + randomNum);
            
            mod_desp = mod_desp + randomNum;
            if ((mod_desp < -100) || (mod_desp > 150)) {
                mod_desp = 0;
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
            this.box.setAttribute('position', position_desp_signal_4);
            this.box.setAttribute('width','4px');
            this.box.setAttribute('height','2px');
            this.box.setAttribute('depth','0.5px');
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
            this.text.setAttribute('position', '-1.7 0 0.25');
            this.text.setAttribute('scale', '2.25 2.25 2.25');
            this.box.appendChild(this.text);

            for(x=0; x<=400; x+=1) {
                var desp_y = 180;
                var desp_x = 0.0;
                   
                y = desp_y - Math.max(desp_x, 0)*1; // Modify high

                if (x < 70 - mod_desp) {
                    this.ctx.lineTo(x, 75);    
                }
                if ((x >= 70 - mod_desp)&&(x < 100 - mod_desp)) {
                    this.ctx.lineTo(x, 25);    
                }
                if ((x >= 100 - mod_desp)&&(x <= 150 - mod_desp)) {
                    this.ctx.lineTo(x, 50);
                }
                if ((x >= 150 - mod_desp)&&(x <= 170 - mod_desp)) {
                    this.ctx.lineTo(x, 75);
                }
                if ((x > 170 - mod_desp)&&(x <= 250 - mod_desp)) {
                    this.ctx.lineTo(x, 100);
                }
                if (x > 250 - mod_desp) {
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

            // el.getObject3D('mesh').material = new THREE.MeshBasicMaterial({ map: this.texture });;
            el.getObject3D('mesh').material = new THREE.MultiMaterial(materials);

            mod_desp = 0;
        });
    }
});

AFRAME.registerComponent('scaled-signal_4', {
    schema: {
        width: {default: 9},
        height: {default: 4.5},
        depth: {default: 1},
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
                this.ctx.moveTo(x+5, 75);  // línea discontinua STARTING POINT
                this.ctx.lineTo(x, 75);  // ENDING POINT
            }
            //AXIS LINE Y
            for(y=0; y<400; y += 20) { // 360 steps for entire sine period
                this.ctx.moveTo(150, y+5);  // línea discontinua STARTING POINT
                this.ctx.lineTo(150, y);  // draw ENDING POINT
            }

            // SIGNAL
            this.ctx.moveTo(0,180);  // turn left to draw signal

            // generate random number between -8 to 15
            var minlimit = -8;
            var maxlimit = 15;
            var randomNum = Math.floor(Math.random() * (maxlimit)) + (minlimit);
            if (randomNum == 1) {
                randomNum = 0;
            }
            
            mod_scaled = randomNum;
            
            if (this.scene != null) {
                this.scene.removeChild(this.box);
            } 
            if (this.box != null) {
                this.box.removeChild(this.text);
            }
            
            this.scene = document.querySelector('a-scene');
            this.box = document.createElement('a-box');
            this.box.setAttribute('position', position_scaled_signal_4);
            this.box.setAttribute('width','4px');
            this.box.setAttribute('height','2px');
            this.box.setAttribute('depth','0.5px');
            this.box.setAttribute('color', 'white');
            this.scene.appendChild(this.box);
                        
            this.text = document.createElement('a-text');

            // var signo = '';
            if (randomNum => 0) {
                // signo = ' + ';
                randomNum = randomNum;
            } 
            if (randomNum < 0){
                // signo = ' - ';
                randomNum = -randomNum;
            }

            if (mod_scaled > 0) {
                var result = "y(t) = x(t/" + randomNum + ")";
            } else if (mod_scaled < 0){
                var result = "y(t) = x(" + randomNum + "t)"
            } else {
                var result = "y(t) = x(t)";
            }
            console.log(result)

            this.text.setAttribute('value', result);
            this.text.setAttribute('color', 'red');
            this.text.setAttribute('position', '-1.8 0 0.25');
            this.text.setAttribute('scale', '3 3 3');
            this.box.appendChild(this.text);

            for(x=0; x<=400; x+=1) {
                var desp_y = 180;
                var desp_x = 0.0;
                var mod_desp = 0;
                   
                y = desp_y - Math.max(desp_x, 0)*1; // Modify high

                if (x < 30){
                    this.ctx.lineTo(x, 75);
                }
                if ((x >= 30)&&(x < 70 + mod_desp)) {
                    this.ctx.lineTo(x - mod_scaled, 75);    
                }
                if ((x >= 70 + mod_desp)&&(x < 85 + mod_desp)) {
                    this.ctx.lineTo(x - mod_scaled, 25);    
                }
                if ((x >= 85 + mod_desp)&&(x < 100 + mod_desp)) {
                    this.ctx.lineTo(x + mod_scaled, 25);    
                }
                if ((x >= 100 + mod_desp)&&(x < 105 + mod_desp)) {
                    this.ctx.lineTo(x + mod_scaled, 50);
                }
                if ((x >= 105 + mod_desp)&&(x < 110 + mod_desp)) {
                    this.ctx.lineTo(x - mod_scaled, 50);
                }
                if ((x >= 110 + mod_desp)&&(x < 120 + mod_desp)) {
                    this.ctx.lineTo(x - mod_scaled, 50);
                }
                if ((x >= 120 + mod_desp)&&(x < 130 + mod_desp)) {
                    this.ctx.lineTo(x - mod_scaled, 50);
                }
                if ((x > 130 + mod_desp)&&(x <= 150 + mod_desp)) {
                    this.ctx.lineTo(x + mod_scaled, 50);
                }
                if ((x >= 150 + mod_desp)&&(x < 160 + mod_desp)) {
                    this.ctx.lineTo(x + mod_scaled, 75);
                }
                if ((x >= 160 + mod_desp)&&(x <= 170 + mod_desp)) {
                    this.ctx.lineTo(x - mod_scaled, 75);
                }
                if ((x > 170 + mod_desp)&&(x < 210 + mod_desp)) {
                    this.ctx.lineTo(x - mod_scaled, 100);
                }
                if ((x >= 210 + mod_desp)&&(x <= 250 + mod_desp)) {
                    this.ctx.lineTo(x + mod_scaled, 100);
                }
                if (x > 250 + mod_desp) {
                    this.ctx.lineTo(x + mod_scaled, 75);
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

AFRAME.registerComponent('inv-signal_4', {
    schema: {
        width: {default: 9},
        height: {default: 4.5},
        depth: {default: 1},
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

            var mod_inv = -25;

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
               var mod_inv = mod_inv - 125;
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
                this.box.setAttribute('position', position_inv_signal_4);
                this.box.setAttribute('width','4px');
                this.box.setAttribute('height','2px');
                this.box.setAttribute('depth','0.5px');
                this.box.setAttribute('color', 'white');
                this.scene.appendChild(this.box);
                            
                this.text = document.createElement('a-text');

                this.text.setAttribute('value', "y(t) = x(-t)");
                this.text.setAttribute('color', 'red');
                this.text.setAttribute('position', '-1.6 0 0.25');
                this.text.setAttribute('scale', '3 3 3');
                this.box.appendChild(this.text);

                for(x=0; x<=400; x+=1) {
                    var desp_y = 180;
                    var desp_x = 0.0;
                    var mod_desp = 0;
                    
                    y = desp_y - Math.max(desp_x, 0)*1; // Modify high

                    if (x < 75 - mod_desp + mod_inv) {
                        this.ctx.lineTo(x, 75);    
                    }
                    if ((x >= 75 - mod_desp + mod_inv)&&(x < 155 - mod_desp + mod_inv)) {
                        this.ctx.lineTo(x, 100);    
                    }
                    if ((x >= 155 - mod_desp + mod_inv)&&(x <= 175 - mod_desp + mod_inv)) {
                        this.ctx.lineTo(x, 75);
                    }
                    if ((x >= 175 - mod_desp + mod_inv)&&(x <= 225 - mod_desp + mod_inv)) {
                        this.ctx.lineTo(x, 50);
                    }
                    if ((x > 225 - mod_desp + mod_inv)&&(x <= 255 - mod_desp + mod_inv)) {
                        this.ctx.lineTo(x, 25);
                    }
                    if (x > 255 - mod_desp + mod_inv) {
                        this.ctx.lineTo(x, 75);
                    }
                }
                
            } else { // Count odd --> x(t)
                this.scene = document.querySelector('a-scene');
                this.box = document.createElement('a-box');
                this.box.setAttribute('position', position_inv_signal_4);
                this.box.setAttribute('width','4px');
                this.box.setAttribute('height','2px');
                this.box.setAttribute('depth','0.5px');
                this.box.setAttribute('color', 'white');
                this.scene.appendChild(this.box);
                            
                this.text = document.createElement('a-text');

                this.text.setAttribute('value', "y(t) = x(t)");
                this.text.setAttribute('color', 'black');
                this.text.setAttribute('position', '-1.55 0 0.25');
                this.text.setAttribute('scale', '3 3 3');
                this.box.appendChild(this.text);
                
                for(x=0; x<=400; x+=1) {
                    var desp_y = 180;
                    var desp_x = 0.0;
                    var mod_desp = 0;
                       
                    y = desp_y - Math.max(desp_x, 0)*1;
                    
                    if (x < 70) {
                        this.ctx.lineTo(x, 75);    
                    }
                    if ((x >= 70)&&(x < 100)) {
                        this.ctx.lineTo(x, 25);    
                    }
                    if ((x >= 100)&&(x <= 150)) {
                        this.ctx.lineTo(x, 50);
                    }
                    if ((x >= 150)&&(x <= 170)) {
                        this.ctx.lineTo(x, 75);
                    }
                    if ((x > 170)&&(x <= 250)) {
                        this.ctx.lineTo(x, 100);
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

AFRAME.registerComponent('high-signal_4', {
    schema: {
        width: {default: 9},
        height: {default: 4.5},
        depth: {default: 1},
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
                this.ctx.moveTo(x+5, 75);  // línea discontinua STARTING POINT
                this.ctx.lineTo(x, 75);  // ENDING POINT
            }
            //AXIS LINE Y
            for(y=0; y<400; y += 20) { // 360 steps for entire sine period
                this.ctx.moveTo(150, y+5);  // línea discontinua STARTING POINT
                this.ctx.lineTo(150, y);  // draw ENDING POINT
            }

            // SIGNAL
            this.ctx.moveTo(0,180);  // turn left to draw signal

            // generate random number between -50 to 95
            var minlimit = -50;
            var maxlimit = 100;
            var randomNum = Math.floor(Math.random() * (maxlimit)) + (minlimit);
            // console.log("Random number = " + randomNum);
            
            mod_high = randomNum;
            if ((mod_high <= -50) || (mod_high >= 80)) {
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
            this.box.setAttribute('position', position_high_signal_4);
            this.box.setAttribute('width','4px');
            this.box.setAttribute('height','2px');
            this.box.setAttribute('depth','0.5px');
            this.box.setAttribute('color', 'white');
            this.scene.appendChild(this.box);
                        
            this.text = document.createElement('a-text');

            var signo = '';
            if (randomNum => 0) {
                signo = ' + ';
                randomNum = randomNum;
            } 
            if (randomNum < 0){
                signo = ' - ';
                randomNum = -randomNum;
            }

            this.text.setAttribute('value', "y(t) = x(t) " + signo + " " + randomNum);
            this.text.setAttribute('color', 'red');
            this.text.setAttribute('position', '-1.8 0 0.25');
            this.text.setAttribute('scale', '2.5 2.5 2.5');
            this.box.appendChild(this.text);

/*             if (mod_inv != 0) {
               var mod_inv = mod_inv - 50;
            } */

            for(x=0; x<=400; x+=1) {
                var desp_y = 180;
                var desp_x = 0.0;
                var mod_desp = 0;
                   
                y = desp_y - Math.max(desp_x, 0)*1; // Modify ampli

                if (x < 70 + mod_desp) {
                    this.ctx.lineTo(x, 75 - mod_high);    
                }
                if ((x >= 70 + mod_desp)&&(x < 100 + mod_desp)) {
                    this.ctx.lineTo(x, (25) - mod_high);    
                }
                if ((x >= 100 + mod_desp)&&(x <= 150 + mod_desp)) {
                    this.ctx.lineTo(x, (50) - mod_high);
                }
                if ((x >= 150 + mod_desp)&&(x <= 170 + mod_desp)) {
                    this.ctx.lineTo(x, 75 - mod_high);
                }
                if ((x > 170 + mod_desp)&&(x <= 250 + mod_desp)) {
                    this.ctx.lineTo(x, (100) - mod_high);
                }
                if (x > 250 + mod_desp) {
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

AFRAME.registerComponent('neg-signal_4', {
    schema: {
        width: {default: 9},
        height: {default: 4.5},
        depth: {default: 1},
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
                this.box.setAttribute('position', position_neg_signal_4);
                this.box.setAttribute('width','4px');
                this.box.setAttribute('height','2px');
                this.box.setAttribute('depth','0.5px');
                this.box.setAttribute('color', 'white');
                this.box.setAttribute('border-width', '0.5px');
                this.box.setAttribute('border-style', 'solid');
                this.box.setAttribute('border-color', 'red');
                this.scene.appendChild(this.box);
                                
                this.text = document.createElement('a-text');

                this.text.setAttribute('value', "y(t) = -x(t)");
                this.text.setAttribute('color', 'red');
                this.text.setAttribute('position', '-1.6 0 0.25');
                this.text.setAttribute('scale', '3.25 3.25 3.25');
                this.box.appendChild(this.text);

                for(x=0; x<=400; x+=1) {
                    var desp_y = 180;
                    var desp_x = 0.0;
                       
                    y = desp_y - Math.max(desp_x, 0)*1;
                    
                    if (x < 70) {
                        this.ctx.lineTo(x, 75);    
                    }
                    if ((x >= 70)&&(x < 100)) {
                        this.ctx.lineTo(x, 125);    
                    }
                    if ((x >= 100)&&(x <= 150)) {
                        this.ctx.lineTo(x, 100);
                    }
                    if ((x >= 150)&&(x <= 170)) {
                        this.ctx.lineTo(x, 75);
                    }
                    if ((x > 170)&&(x <= 250)) {
                        this.ctx.lineTo(x, 50);
                    }
                    if (x > 250) {
                        this.ctx.lineTo(x, 75);
                    }
                }
                
            } else { // Count odd --> x(t)
                this.scene = document.querySelector('a-scene');
                this.box = document.createElement('a-box');
                this.box.setAttribute('position', position_neg_signal_4);
                this.box.setAttribute('width','4px');
                this.box.setAttribute('height','2px');
                this.box.setAttribute('depth','0.5px');
                this.box.setAttribute('color', 'white');
                this.box.setAttribute('border-width', '0.5px');
                this.box.setAttribute('border-style', 'solid');
                this.box.setAttribute('border-color', 'red');
                this.scene.appendChild(this.box);
                                
                this.text = document.createElement('a-text');

                this.text.setAttribute('value', "y(t) = x(t)");
                this.text.setAttribute('color', 'black');
                this.text.setAttribute('position', '-1.5 0 0.25');
                this.text.setAttribute('scale', '3.25 3.25 3.25');
                this.box.appendChild(this.text);

                for(x=0; x<=400; x+=1) {
                    var desp_y = 180;
                    var frec = 90;
                    var scaled = 120;
                    var desp_x = 0.0;
                    var mod_desp = 0;
                       
                    y = desp_y - Math.max(desp_x, 0)*1;
                    
                    if (x < 70) {
                        this.ctx.lineTo(x, 75);    
                    }
                    if ((x >= 70)&&(x < 100)) {
                        this.ctx.lineTo(x, 25);    
                    }
                    if ((x >= 100)&&(x <= 150)) {
                        this.ctx.lineTo(x, 50);
                    }
                    if ((x >= 150)&&(x <= 170)) {
                        this.ctx.lineTo(x, 75);
                    }
                    if ((x > 170)&&(x <= 250)) {
                        this.ctx.lineTo(x, 100);
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
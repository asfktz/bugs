'use strict';

class DragonFly {
    constructor() {
        this.position = new p5.Vector(width * 0.5, height * 0.5);
        this.velocity = new p5.Vector(0, 0);
        this.acceleration = new p5.Vector(0, 0);
        this.t = random(100000);
        this.walkDuration = 0;
        this.pauseDuration = random(0.20, 0.50);
        this.pausePhase = random(1000 - 1000 * this.pauseDuration);
    }

    update() {
        this.walkDuration++;

        var w = this.walkDuration % 1000;

        if (w >= this.pausePhase && w < this.pausePhase + this.pausePhase * this.pauseDuration) {
          this.acceleration.set(0,0);

          if (w === this.pausePhase) {
            this.t += 5;
          }
        } else {
          let ang = map(noise(this.t), 0, 1, -PI * 2, PI * 2);

          this.acceleration = p5.Vector.fromAngle(ang);
          this.velocity.add(this.acceleration);
          this.velocity.limit(5);
          this.angle = this.velocity.heading() + Math.PI * 1.5;
          this.t += 0.01;
        }
        
        this.velocity.mult(0.95);
        this.position.add(this.velocity);
    }

    display() {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.angle);
        noStroke();

        fill(66, 66, 66);
        ellipse(0, 0, 10, 20);
        pop();
    }

    checkEdges() {
        var offset = 30;

        if (this.position.x > width + offset) {
            this.position.x = -offset;
        } else if (this.position.x < -offset) {
            this.position.x = width + offset;
        }

        if (this.position.y > height + offset) {
            this.position.y = -offset;
        } else if (this.position.y < -offset) {
            this.position.y = height;
        }
    }
}


var arr = [];

function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );

    for (let i = 0; i < 100; i++) {
        arr.push(new DragonFly());
    }
}

function draw() {
    background(255, 255, 255);

    for (let i in arr) {
        let dragonFly = arr[i];

        dragonFly.update();
        dragonFly.checkEdges();
        dragonFly.display();
    }
}

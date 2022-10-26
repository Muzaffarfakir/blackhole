let canvas = document.getElementById('canvas');
let s = document.getElementById('s');
let score = 0;
let sww = 50;
let shh = 50;
let left = document.getElementById('left');
let right = document.getElementById('right');
let up = document.getElementById('up');
let down = document.getElementById('down');
let ani;
let c = canvas.getContext('2d');
let cw = innerWidth;
let ch = innerHeight - 190;
canvas.width = cw;
canvas.height = ch;
let mo = [];
let cy = new Image();
let pl = new Image();
pl.src = "p.png";
cy.src = "s.png";
////////////Snake //////////////
class Snake {
  constructor({ pos, vel }, color) {
    this.pos = pos;
    this.vel = vel;
    this.w = 137
    this.h = 168;
    this.starngeFrame = 8;
    this.gameframe = 0;
    this.fx = 0;

  }
  draw() {
    c.beginPath();
    c.drawImage(cy, this.fx * this.w, this.fx, this.w, this.h, this.pos.x, this.pos.y, sww, shh);

    c.stroke();

  }
  update() {
    this.draw();
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    if (this.gameframe % this.starngeFrame == 0) {

      if (this.fx < 6) {
        this.fx++;
      }
      else {
        this.fx = 0;
      }

    }
    this.gameframe++;

    if (this.pos.y + 50 + this.vel.y >= ch) {
      this.vel.y = 0;
    }
    if (this.pos.y + 50 + this.vel.y <= 20) {
      this.vel.y = 0;
    }
    if (this.pos.x + 50 + this.vel.x >= cw) {
      this.vel.x = 0;
    }
    if (this.pos.x + 50 + this.vel.x < 20) {
      this.vel.x = 0;
    }
  }
}
/////////////intilize snake////////
let sn = new Snake({
  pos: {
    x: 100,
    y: 100
  },
  vel: {
    x: 0,
    y: 0
  }
}, 'green');
//////// Add Event listner/////////
right.addEventListener('click', (e) => {
  sn.vel.x += 3;
  sn.vel.y = 0;
});
left.addEventListener('click', (e) => {
  sn.vel.x -= 3;
  sn.vel.y = 0;

});
up.addEventListener('click', (e) => {
  sn.vel.y -= 3;
  sn.vel.x = 0;

});
down.addEventListener('click', (e) => {
  sn.vel.y += 3;
  sn.vel.x = 0;

});
///////////Mouse /////////////////
class MOUSE {
  constructor({ pos }) {
    this.pos = pos;
    this.w = 64;
    this.h = 60;
    this.fx = 0;
    this.gameframe = 0;
    this.starngeFrame = 9;


  }
  draw() {
    c.beginPath();
    //c.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2, false);
    c.drawImage(pl, this.fx * this.w, this.fx, this.w, this.h, this.pos.x, this.pos.y, 30, 30);

    c.fillStyle = 'red';
    c.fill();
    c.stroke();
  }
  update() {
    this.draw();
    if (this.gameframe % this.starngeFrame == 0) {

      if (this.fx < 4) {
        this.fx++;
      }
      else {
        this.fx = 0;
      }

    }
    this.gameframe++;

  }
}

function mouse() {
  setInterval(() => {
    let x = Math.random() * cw;
    let y = Math.random() * ch;
    mo.push(new MOUSE({
      pos: {
        x: x,
        y: y
      }
    }))
  }, 3000)
}

///////////Animation function/////
function animate(e) {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, cw, ch);
  sn.update();
  mo.forEach((mos, i) => {
    mos.update();
    if (sn.pos.x + sww >= mos.pos.x && sn.pos.x <= mos.pos.x + 25 && sn.pos.y + shh >= mos.pos.y && sn.pos.y <= mos.pos.y + 25) {
      mo.splice(i, 1)
      s.innerHTML++;
      sww += 2;
      shh += 2;
    }
  })
}
animate();
mouse();
///Game finish////

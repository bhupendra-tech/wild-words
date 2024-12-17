import { BossArrow, BruteArrow, Bullet, SimpleArrow } from "./bullet";

const c_width = window.innerHeight;
const c_height = (c_width * 3) / 5;

export class Enemies {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  spriteWidth: number;
  spriteHeight: number;
  health: number;
  firingSpeed: number;
  timeSinceLastFired: number;
  firingInterval: number;
  firedShots: Bullet[];
  playerX: number;
  playerY: number;
  markedForDeletion: boolean;
  arrowType: "SIMPLE" | "BOSS" | "BRUTE";
  image: HTMLImageElement;
  frameX: number;
  frameY: number;
  healthBarSize: number;
  setPlayerHealth: (health: number) => void;
  maxFrame: number;
  constructor(
    ctx: CanvasRenderingContext2D,
    setPlayerHealth: (health: number) => void
  ) {
    this.ctx = ctx;
    this.setPlayerHealth = setPlayerHealth;
    this.spriteWidth = 64;
    this.spriteHeight = 64;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.x = (Math.random() * c_width) / 2 + (c_width / 2 - this.width);
    this.y = Math.random() * (c_height - this.height);
    this.health = 0;
    this.image = new Image();
    this.firingInterval = 100;
    this.firingSpeed = 1;
    this.timeSinceLastFired = 0;
    this.firedShots = [];
    this.playerX = 0;
    this.playerY = 0;
    this.markedForDeletion = false;
    this.arrowType = "SIMPLE";
    this.image = new Image();
    this.frameX = 0;
    this.frameY = 0;
    this.healthBarSize = 0;
    this.maxFrame = 0;
  }
  update() {
    if (this.frameY === 0) this.maxFrame = 7;
    else this.maxFrame = 5;

    if (this.frameX > this.maxFrame) this.frameX = 0;

    if (this.health <= 0) {
      this.frameY = 1;
      if (this.frameX < this.maxFrame) {
        this.frameX++;
      } else {
        this.markedForDeletion = true;
      }
    }

    this.firedShots = this.firedShots.filter(
      (bullet) => !bullet.markedForDeletion
    );
    if (this.timeSinceLastFired > this.firingInterval) {
      this.timeSinceLastFired = 0;
      if (this.arrowType === "SIMPLE") {
        this.firedShots.push(
          new SimpleArrow(
            this.ctx,
            this.x,
            this.y + this.height / 2,
            this.playerX,
            this.playerY,
            (health) => this.setPlayerHealth(health)
          )
        );
      } else if (this.arrowType === "BRUTE") {
        this.firedShots.push(
          new BruteArrow(
            this.ctx,
            this.x,
            this.y + this.height / 2,
            this.playerX,
            this.playerY,
            (health) => this.setPlayerHealth(health)
          )
        );
      } else {
        this.firedShots.push(
          new BossArrow(
            this.ctx,
            this.x,
            this.y + this.height / 2,
            this.playerX,
            this.playerY,
            (health) => this.setPlayerHealth(health)
          )
        );
      }
    } else {
      this.firedShots.forEach((bullet) => bullet.update());
      this.timeSinceLastFired += this.firingSpeed;
      if (Math.floor(this.firingInterval / this.timeSinceLastFired) == 0)
        this.frameX++;
    }
  }
  draw() {
    this.firedShots.forEach((bullet) => bullet.draw());
    if (this.health > 50) {
      this.ctx.fillStyle = "green";
    } else {
      this.ctx.fillStyle = "red";
    }
    // health bar
    this.ctx.fillRect(
      this.x - 10,
      this.y - 20,
      this.health / this.healthBarSize,
      10
    );
    // character
    this.ctx.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  setHealth(health: number) {
    this.health += health;
  }
}

export class SmallPunks extends Enemies {
  constructor(
    ctx: CanvasRenderingContext2D,
    playerX: number,
    playerY: number,
    setPlayerHealth: (health: number) => void
  ) {
    super(ctx, setPlayerHealth);
    this.firingSpeed = 10;
    this.firingInterval = 1000;
    this.timeSinceLastFired = 0;
    this.playerX = playerX;
    this.playerY = playerY;
    this.health = 100;
    this.arrowType = "SIMPLE";
    this.image.src = "./smallpunk.png";
    this.healthBarSize = Math.ceil(this.health / 100);
  }
}

export class SharpShooter extends Enemies {
  constructor(
    ctx: CanvasRenderingContext2D,
    playerX: number,
    playerY: number,
    setPlayerHealth: (health: number) => void
  ) {
    super(ctx, setPlayerHealth);
    this.firingSpeed = 10;
    this.firingInterval = 500;
    this.timeSinceLastFired = 0;
    this.playerX = playerX;
    this.playerY = playerY;
    this.health = 200;
    this.arrowType = "SIMPLE";
    this.image.src = "./sharpshooter.png";
    this.healthBarSize = Math.ceil(this.health / 100);
    this.width = this.width * 1.2;
    this.height = this.height * 1.2;
  }
}
export class BruteShooter extends Enemies {
  constructor(
    ctx: CanvasRenderingContext2D,
    playerX: number,
    playerY: number,
    setPlayerHealth: (health: number) => void
  ) {
    super(ctx, setPlayerHealth);
    this.firingSpeed = 10;
    this.firingInterval = 1000;
    this.timeSinceLastFired = 0;
    this.playerX = playerX;
    this.playerY = playerY;
    this.health = 200;
    this.arrowType = "BRUTE";
    this.image.src = "./bruteshooter.png";
    this.healthBarSize = Math.ceil(this.health / 100);
    this.width = this.width * 1.5;
    this.height = this.height * 1.5;
  }
}
export class BossShooter extends Enemies {
  constructor(
    ctx: CanvasRenderingContext2D,
    playerX: number,
    playerY: number,
    setPlayerHealth: (health: number) => void
  ) {
    super(ctx, setPlayerHealth);
    this.firingSpeed = 10;
    this.firingInterval = 1000;
    this.timeSinceLastFired = 0;
    this.playerX = playerX;
    this.playerY = playerY;
    this.health = 1000;
    this.arrowType = "BOSS";
    this.image.src = "./bigbadboss.png";
    this.healthBarSize = Math.ceil(this.health / 100);
    this.width = this.width * 1.8;
    this.height = this.height * 1.8;
    this.x = c_width - this.width + 30;
    this.y = c_height / 2 - this.height / 2 - 30;
  }
}

// we will call small punk and other classes and pass the ctx to it
// this classes will use enemy update and draw method

// after every random interval fire a shoot
// after random interval push the bullet  into the array of firedbullets once it reaches the player pop it
// in update of enemy update firedBullets.update()
// varaibles :

// firingInterval = 100 // after every 100 second it will fire
// timeSinceLastFired = 0
// firingSpeed = 10;

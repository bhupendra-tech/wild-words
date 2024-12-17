import { arrowTypes, SimpleArrow } from "./bullet";
const c_height = window.innerHeight;

export class Player {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  spriteHeight: number;
  spriteWidth: number;
  width: number;
  height: number;
  health: number;
  firedShots: arrowTypes[];
  healthBarSize: number;
  image: HTMLImageElement;
  frameX = 0;
  frameY = 0;
  maxFrame: number;
  fireShot: boolean;
  playerDied: boolean;
  fireBullet: boolean;
  maxArrows: number;
  arrowUsed: number;
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.spriteWidth = 64;
    this.spriteHeight = 64;
    this.width = this.spriteWidth + 10;
    this.height = this.spriteHeight + 10;
    this.x = 10;
    this.y = c_height / 2 - this.height / 2;
    this.firedShots = [];
    this.health = 5000;
    this.healthBarSize = Math.ceil(this.health / 100);
    this.image = new Image();
    this.image.src = "./hero.png";
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 0;
    this.fireShot = false;
    this.playerDied = false;
    this.fireBullet = false;
    this.maxArrows = 84;
    this.arrowUsed = 0;
  }
  update() {
    if (this.frameY === 0) this.maxFrame = 7;
    else this.maxFrame = 5;

    // death animation
    if (this.health <= 0) {
      this.frameY = 1;
      if (this.frameX < this.maxFrame) {
        this.frameX++;
      } else {
        this.playerDied = true;
      }
    }

    if (this.fireShot) {
      if (this.frameX < this.maxFrame) this.frameX++;
      else {
        this.frameX = 0;
        this.fireShot = false;
        this.fireBullet = true;
      }
    }
    if (this.fireBullet) {
      this.firedShots = this.firedShots.filter(
        (bullet) => !bullet.markedForDeletion
      );
      this.firedShots.forEach((bullet) => {
        bullet.update();
      });
    }
  }
  fire(
    enemyPositionX: number,
    enemyPositionY: number,
    setEnemyHealth: (health: number) => void
  ) {
    this.fireShot = true;
    this.firedShots.push(
      new SimpleArrow(
        this.ctx,
        this.x + this.width,
        this.y + this.height / 2,
        enemyPositionX,
        enemyPositionY,
        (health) => setEnemyHealth(health)
      )
    );
  }
  draw() {
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
    this.firedShots.forEach((bullet) => {
      bullet.draw();
    });
    if (this.health > 50) {
      this.ctx.fillStyle = "green";
    } else {
      this.ctx.fillStyle = "red";
    }
    // health bar
    this.ctx.fillRect(
      this.x + 10,
      this.y - 20,
      this.health / this.healthBarSize,
      10
    );
  }
  setHealth(health: number) {
    this.health += health;
  }
}

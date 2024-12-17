// the very moment bullet instance is created it will start traveling toward the destination
export type arrowTypes = SimpleArrow | BruteArrow | BossArrow;
export class Bullet {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  bulletDamage: number;
  markedForDeletion: boolean;
  destinationX: number;
  destinationY: number;
  descendOfBullet: number;
  directionOfBulletPoint: "up" | "down" | "straight";
  direction: "bulletGoingFromLeftToRight" | "bulletGoingFromRightToLeft";
  image: HTMLImageElement;
  setHealth: (health: number) => void;
  angle: number;
  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    destinationX: number,
    destinationY: number,
    setHealth: (health: number) => void
  ) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.destinationX = destinationX;
    this.destinationY = destinationY;
    this.width = 7;
    this.height = 26;
    this.speed = 10;
    this.bulletDamage = 0;
    this.markedForDeletion = false;
    this.descendOfBullet =
      Math.floor(this.destinationY - this.y) /
      Math.floor(Math.abs(this.destinationX - this.x) / this.speed);
    this.directionOfBulletPoint =
      this.destinationY - this.y === 0
        ? "straight"
        : this.destinationY - this.y > 0
        ? "down"
        : "up";
    this.direction =
      this.destinationX > this.x
        ? "bulletGoingFromLeftToRight"
        : "bulletGoingFromRightToLeft";
    this.setHealth = setHealth;
    this.image = new Image();
    this.angle = Math.atan2(this.destinationX - x, this.destinationY - y);
  }
  update() {
    if (this.directionOfBulletPoint === "down") {
      if (this.y > this.destinationY) {
        this.markedForDeletion = true;
        this.setHealth(-this.bulletDamage);
      }
    } else if (this.directionOfBulletPoint === "up") {
      if (this.y < this.destinationY) {
        this.markedForDeletion = true;
        this.setHealth(-this.bulletDamage);
      }
    } else {
      if (this.x < this.destinationX) {
        this.markedForDeletion = true;
      }
    }
    if (this.direction === "bulletGoingFromLeftToRight") {
      this.x += this.speed;
    } else if (this.direction === "bulletGoingFromRightToLeft") {
      this.x -= this.speed;
    }
    this.y += this.descendOfBullet;
  }
  draw() {
    this.ctx.setTransform(1, 0, 0, 1, this.x, this.y);
    this.ctx.rotate(4.56 + 1.55 - this.angle);
    this.ctx.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      0 - this.width / 2,
      0 - this.height / 2,
      this.width,
      this.height
    );
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}

export class SimpleArrow extends Bullet {
  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    destinationX: number,
    destinationY: number,
    setHealth: (health: number) => void
  ) {
    super(ctx, x, y, destinationX, destinationY, setHealth);
    this.bulletDamage = 50;
    this.image.src = "./simplearrow.png";
  }
}
export class BruteArrow extends Bullet {
  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    destinationX: number,
    destinationY: number,
    setHealth: (health: number) => void
  ) {
    super(ctx, x, y, destinationX, destinationY, setHealth);
    this.bulletDamage = 100;
    this.image.src = "./brutearrow.png";
  }
}
export class BossArrow extends Bullet {
  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    destinationX: number,
    destinationY: number,
    setHealth: (health: number) => void
  ) {
    super(ctx, x, y, destinationX, destinationY, setHealth);
    this.bulletDamage = 200;
    this.image.src = "./bossarrow.png";
  }
}

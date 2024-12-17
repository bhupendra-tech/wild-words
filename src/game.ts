import { BossShooter, BruteShooter, SharpShooter, SmallPunks } from "./enemy";
import { Player } from "./player";
import { PuzzleData, puzzleData, waves } from "./game_data";

const c_width = window.innerHeight;
const c_height = (c_width * 3) / 5;

const arrowExhaustedMsg = document.querySelector<HTMLDivElement>(
  "#arrow-exhausted-msg"
);
const congratulationMsg = document.querySelector<HTMLDivElement>(
  "#congratulations-msg"
);
const playerDiedMsg = document.querySelector<HTMLDivElement>("#playerDied-msg");

const gameControllerBox =
  document.querySelector<HTMLDivElement>("#game-controller");

const loadingScreen = document.querySelector<HTMLDivElement>("#loading");

export class Game {
  ctx: CanvasRenderingContext2D;
  player: Player;
  enemies: (SmallPunks | SharpShooter | BossShooter | BruteShooter)[];
  waveNumber: number;
  gameQuestions: HTMLParagraphElement;
  optionBtns: NodeListOf<HTMLButtonElement>;
  stopGame: boolean;
  canvas: HTMLCanvasElement;
  puzzles: PuzzleData[];
  animate: (timeStamp: number) => void;
  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    animate: (timeStamp: number) => void
  ) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.player = new Player(this.ctx);
    this.waveNumber = 0;
    canvas.style.backgroundImage = `url(wave${this.waveNumber}bg.png)`;
    this.gameQuestions = document.getElementById(
      "game-question"
    ) as HTMLParagraphElement;
    this.optionBtns = document.querySelectorAll(".option-btn");
    this.stopGame = false;
    this.enemies = this.getEnemies();
    this.puzzles = puzzleData;
    this.animate = animate;
  }
  update() {
    // player died
    if (this.player.playerDied) {
      this.playerDied();
    }
    // this means all enemies have been killed
    if (this.waveNumber >= 4) {
      this.congratulate();
    }
    // this means the current wave has been killed
    if (this.enemies.length === 0 && this.waveNumber < 4) {
      this.startNewWave();
    }
    this.player.update();
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
    this.enemies.forEach((enemy) => enemy.update());
  }
  handleQuestions = () => {
    // the word have been finished but the enemies are still present

    if (
      this.player.arrowUsed > this.player.maxArrows &&
      this.enemies.length > 0
    ) {
      this.arrowExhausted();
    }
    if (!this.stopGame) {
      let randomIndex = Math.floor(Math.random() * puzzleData.length);
      4;
      const { text, options, ans } = puzzleData[randomIndex];
      this.gameQuestions.innerText = text;
      this.optionBtns.forEach((button, index) => {
        button.onclick = null;
        button.innerText = options[index];
        button.onclick = () => {
          console.log("clicked");
          this.player.arrowUsed++;
          if (index === ans && this.enemies.length > 0) {
            const randomIndex = Math.floor(Math.random() * this.enemies.length);
            const aimX = this.enemies[randomIndex].x;
            const aimY =
              this.enemies[randomIndex].y +
              this.enemies[randomIndex].height / 2;
            this.player.fire(aimX, aimY, (health) =>
              this.enemies[randomIndex]?.setHealth(health)
            );
          }
          this.handleQuestions();
        };
      });
      this.puzzles =
        this.puzzles.filter((_, index) => index !== randomIndex) || [];
      if (this.puzzles.length === 0) this.puzzles = puzzleData;
    }
  };

  congratulate() {
    this.stopGame = true;
    gameControllerBox?.classList.replace("flex", "hidden");
    congratulationMsg?.classList.replace("hidden", "flex");
  }
  playerDied() {
    this.stopGame = true;
    gameControllerBox?.classList.replace("flex", "hidden");
    playerDiedMsg?.classList.replace("hidden", "flex");
  }
  arrowExhausted() {
    this.stopGame = true;
    gameControllerBox?.classList.replace("flex", "hidden");
    arrowExhaustedMsg?.classList.replace("hidden", "flex");
  }
  getEnemies = () => {
    if (this.waveNumber >= 4) return [];
    else
      return waves[this.waveNumber].map((enemy) => {
        if (enemy === "smallPunks") {
          return new SmallPunks(
            this.ctx,
            this.player.x + this.player.width,
            this.player.y + this.player.height / 2,
            (health) => this.player.setHealth(health)
          );
        } else if (enemy === "sharpShooter") {
          return new SharpShooter(
            this.ctx,
            this.player.x + this.player.width,
            this.player.y + this.player.height / 2,
            (health) => this.player.setHealth(health)
          );
        } else if (enemy === "bruteShooter") {
          new BruteShooter(
            this.ctx,
            this.player.x + this.player.width,
            this.player.y + this.player.height / 2,
            (health) => this.player.setHealth(health)
          );
        } else if (enemy === "bigBadBoss") {
          return new BossShooter(
            this.ctx,
            this.player.x + this.player.width,
            this.player.y + this.player.height / 2,
            (health) => this.player.setHealth(health)
          );
        }
        return new SmallPunks(
          this.ctx,
          this.player.x + this.player.width,
          this.player.y + this.player.height / 2,
          (health) => this.player.setHealth(health)
        );
      });
  };
  draw() {
    this.ctx.clearRect(0, 0, c_width, c_height);
    this.player.draw();
    this.enemies.forEach((enemy) => {
      enemy.draw();
    });
  }
  startNewWave() {
    this.stopGame = true;
    this.waveNumber++;
    this.enemies = this.getEnemies();
    this.canvas.style.backgroundImage = `url(wave${this.waveNumber}bg.png)`;
    this.stopGame = true;
    if (loadingScreen) {
      gameControllerBox?.classList.replace("flex", "hidden");

      loadingScreen?.classList.replace("hidden", "flex");
      loadingScreen.style.backgroundColor = "black";
      loadingScreen.style.opacity = "1";
    }
    setTimeout(() => {
      gameControllerBox?.classList.replace("hidden", "flex");
      loadingScreen?.classList.replace("flex", "hidden");
      this.stopGame = false;
      this.unPauseGame();
    }, 2000);
  }
  unPauseGame() {
    this.animate(0);
  }
  playAgain() {
    congratulationMsg?.classList.replace("flex", "hidden");
    playerDiedMsg?.classList.replace("flex", "hidden");
    arrowExhaustedMsg?.classList.replace("flex", "hidden");
    gameControllerBox?.classList.replace("hidden", "flex");
  }
}

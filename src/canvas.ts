import { Game } from "./game";

window.addEventListener("load", () => {
  const canvas = document.querySelector<HTMLCanvasElement>("#game-canvas");
  if (!canvas) {
    throw new Error("Canvas not present");
  }
  canvas.width = window.innerWidth;
  canvas.height = (canvas.width * 3) / 5;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context not present");
  }
  let game = new Game(ctx, canvas, animate);
  game.handleQuestions();
  let lastTimeStamp = 0;
  let deltaTime = 0;
  let timeSinceLastUpdate = 0;
  let maxIntervalBeforeUpdate = 16;
  function animate(timeStamp: number) {
    deltaTime = timeStamp - lastTimeStamp;
    lastTimeStamp = timeStamp;
    if (timeSinceLastUpdate > maxIntervalBeforeUpdate) {
      game.update();
      game.draw();
      timeSinceLastUpdate = 0;
    } else {
      timeSinceLastUpdate += deltaTime;
    }
    !game.stopGame ? requestAnimationFrame(animate) : "";
  }
  animate(0);
  const playAgainBtns: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll(".play-again-btn");
  playAgainBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      game.playAgain();
      game.stopGame = false;
      game = new Game(ctx, canvas, animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      game.unPauseGame();
      game.handleQuestions();
    })
  );
});

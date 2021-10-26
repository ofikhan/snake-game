document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".grid div");
  const scoreDisplay: HTMLDivElement = document.querySelectorAll(
    ".score"
  )[0] as unknown as HTMLDivElement;
  const startButton: HTMLButtonElement = document.querySelectorAll(
    ".start"
  )[0] as unknown as HTMLButtonElement;
  const result: HTMLDivElement = document.querySelectorAll(
    ".result"
  )[0] as unknown as HTMLDivElement;

  const width: number = 20;

  let currentIndex: number = 0;
  let appleIndex: number = 0;
  let currentSnake: number[] = [2, 1, 0];

  let direction: number = 1;
  let score: number = 0;
  let speed: number = 0.9;
  let intervalTime: number = 0;
  let interval: number = 0;

  // start the game
  function startGame() {
    currentSnake.forEach((index) => squares[index].classList.remove("snake"));
    squares[appleIndex].classList.remove("apple");
    clearInterval(interval);
    score = 0;
    randomApple();
    direction = 1;
    scoreDisplay.innerText = "0";
    intervalTime = 1000;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    interval = setInterval(moveOutcomes, intervalTime);
    result.textContent = "";
  }

  // dealing with the snake outcomes
  function moveOutcomes() {
    if (
      // hits left
      (currentSnake[0] % width === 0 && direction === -1) ||
      // hits top
      (currentSnake[0] - width < 0 && direction === -width) ||
      // hits right
      (currentSnake[0] % width === width - 1 && direction === 1) ||
      // hits bottom
      (currentSnake[0] + width >= width * width && direction === width) ||
      // hits itself
      squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
      result.textContent = "Game Over";
      return clearInterval(interval);
    }

    const tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);

    // snake eating apple
    if (squares[currentSnake[0]].classList.contains("apple")) {
      squares[currentSnake[0]].classList.remove("apple");
      squares[tail].classList.add("snake");
      currentSnake.push(tail);
      randomApple();
      score++;
      scoreDisplay.textContent = score.toString();
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutcomes, intervalTime);
    }
    squares[currentSnake[0]].classList.add("snake");
  }

  // generate random apple
  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake"));
    squares[appleIndex].classList.add("apple");
  }
  // assigning functions to key code
  function control(e: { keyCode: number }) {
    //squares[currentIndex].classList.remove("snake");
    // Left = 37, Up = 38, Right = 39, Down = 40
    if (e.keyCode === 37) {
      direction = -1;
    } else if (e.keyCode === 38) {
      direction = -width;
    } else if (e.keyCode === 39) {
      direction = 1;
    } else if (e.keyCode === 40) {
      direction = +width;
    }
  }

  document.addEventListener("keyup", control);
  startButton.addEventListener("click", startGame);
});

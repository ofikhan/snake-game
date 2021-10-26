document.addEventListener("DOMContentLoaded", function () {
    var squares = document.querySelectorAll(".grid div");
    var scoreDisplay = document.querySelectorAll(".score")[0];
    var startButton = document.querySelectorAll(".start")[0];
    var result = document.querySelectorAll(".result")[0];
    var width = 20;
    var currentIndex = 0;
    var appleIndex = 0;
    var currentSnake = [2, 1, 0];
    var direction = 1;
    var score = 0;
    var speed = 0.9;
    var intervalTime = 0;
    var interval = 0;
    // start the game
    function startGame() {
        currentSnake.forEach(function (index) { return squares[index].classList.remove("snake"); });
        squares[appleIndex].classList.remove("apple");
        clearInterval(interval);
        score = 0;
        randomApple();
        direction = 1;
        scoreDisplay.innerText = "0";
        intervalTime = 1000;
        currentSnake = [2, 1, 0];
        currentIndex = 0;
        currentSnake.forEach(function (index) { return squares[index].classList.add("snake"); });
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
            squares[currentSnake[0] + direction].classList.contains("snake")) {
            result.textContent = "Game Over";
            return clearInterval(interval);
        }
        var tail = currentSnake.pop();
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
    function control(e) {
        //squares[currentIndex].classList.remove("snake");
        // Left = 37, Up = 38, Right = 39, Down = 40
        if (e.keyCode === 37) {
            direction = -1;
        }
        else if (e.keyCode === 38) {
            direction = -width;
        }
        else if (e.keyCode === 39) {
            direction = 1;
        }
        else if (e.keyCode === 40) {
            direction = +width;
        }
    }
    document.addEventListener("keyup", control);
    startButton.addEventListener("click", startGame);
});

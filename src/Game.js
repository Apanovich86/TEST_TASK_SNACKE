import React, {Component} from "react";
import Snake from "./Snake";
import Food from "./Food";
import {addPlayer} from "./services/playerService";
import Players from "./getPlayers";

let status = "started";
let speedProperty = 0;
let speedValue = 200;
let typeFood;
let interval = null;
let apple = new Object();
apple.score = 1;
apple.color = "green";
let carrot = new Object();
carrot.score = 5;
carrot.color = "orange";
let mouse = new Object();
mouse.score = 10;
mouse.color = "gray";
const playerName = localStorage.getItem('player');

let arr = [apple, carrot, mouse]; //food types;
const getRandomCoordinates = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    return [x, y]
}

export const getRandomFoodType = () => {
    typeFood = arr[Math.floor(Math.random() * arr.length)];
    console.log(typeFood.score);
    console.log(typeFood.color);
    return typeFood;
}

const initialState = {
    food: getRandomCoordinates(),
    foodType: getRandomFoodType(),
    score: 0,
    speed: 200,
    direction: 'RIGHT',
    snakeDots: [
        [0, 0],
        [2, 0]
    ]
}

function startInterval(func, time) {
    interval = setInterval(func, time);
}

class Game extends Component {
    state = initialState;

    componentDidMount() {
        startInterval(this.moveSnake, this.state.speed);
        document.onkeydown = this.onKeyDown;
    }

    componentDidUpdate() {
        this.checkIfOutOfBorders();
        this.checkIfCollapsed();
        this.checkIfEat();
    }

    stopGame() {
        clearInterval(interval);
    }

    startGame() {
        startInterval(this.moveSnake, this.state.speed);
    }

    startStop() {
        if (status === "started") {
            this.stopGame();
            status = "stopped"
        } else {
            this.startGame();
            status = "started";
        }
    }

    onKeyDown = (e) => {
        e = e || Event;
        switch (e.keyCode) {
            case 32:
                this.startStop();
                console.log("status", status);
                break;
            case 38:
                if (this.state.direction === "DOWN") {
                    break;
                } else
                    this.setState({direction: 'UP'});
                break;
            case 40:
                if (this.state.direction === "UP") {
                    break;
                }
                this.setState({direction: 'DOWN'});
                break;
            case 37:
                if (this.state.direction === "RIGHT") {
                    break;
                }
                this.setState({direction: 'LEFT'});
                break;
            case 39:
                if (this.state.direction === "LEFT") {
                    break;
                }
                this.setState({direction: 'RIGHT'});
                break;
        }
    }

    moveSnake = () => {
        let dots = [...this.state.snakeDots];
        let head = dots[dots.length - 1];

        switch (this.state.direction) {
            case 'RIGHT':
                head = [head[0] + 2, head[1]];
                break;
            case 'LEFT':
                head = [head[0] - 2, head[1]];
                break;
            case 'DOWN':
                head = [head[0], head[1] + 2];
                break;
            case 'UP':
                head = [head[0], head[1] - 2];
                break;
        }
        dots.push(head);
        dots.shift();
        this.setState({
            snakeDots: dots
        })
    }

    checkIfOutOfBorders() {
        let head = this.state.snakeDots[this.state.snakeDots.length - 1];
        if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
            this.onGameOver();
        }
    }

    checkIfCollapsed() {
        let snake = [...this.state.snakeDots];
        let head = snake[snake.length - 1];
        snake.pop(); //remove from end;
        snake.forEach(dot => {
            if (head[0] == dot[0] && head[1] == dot[1]) {
                this.onGameOver();
            }
        })
    }

    checkIfEat() {
        let head = this.state.snakeDots[this.state.snakeDots.length - 1];
        let food = this.state.food;
        let score = this.state.score;
        if (head[0] == food[0] && head[1] == food[1]) {
            this.setState({score: score + typeFood.score})
            this.setState({
                food: getRandomCoordinates(),
                foodType: getRandomFoodType(),
            })
            this.enlargeSnake();
            this.increaseSpeed();
        }
    }

    enlargeSnake() {
        let newSnake = [...this.state.snakeDots];
        newSnake.unshift([])
        this.setState({
            snakeDots: newSnake
        })
    }

    increaseSpeed() {
        let wholePartScore = Math.floor(this.state.score / 50);
        if (speedProperty < wholePartScore) {
            speedValue = speedValue - 0.05 * (speedValue);
            console.log(speedValue);
            speedProperty = wholePartScore;
            this.setState({
                speed: speedValue
            })
            console.log(this.state.speed);
            startInterval(this.moveSnake, this.state.speed);
        }
    }

    createPlayer() {
        const player = {
            name: playerName,
            score: this.state.score,
        };
        console.log(player);
        addPlayer(player).then(res => {
        })
    }

    onGameOver() {
        let score = this.state.score;
        alert(`Game Over. You scored ${score} points\n${<Players/>}`);
        this.createPlayer();
        clearInterval(interval);
        this.setState(initialState);
    }

    render() {
        return (
            <div>
                <div className="info">Player: {playerName}; Counting points: {this.state.score}</div>
                <div className="game-area">
                    <Snake snakeDots={this.state.snakeDots}/>
                    <Food dot={this.state.food} color={typeFood.color}/>
                </div>
                <div className="info">
                    <button onClick={() => this.stopGame()}>STOP</button>
                    <button id="startButton" onClick={() => this.startGame()}>PLAY</button>
                </div>
            </div>
        );
    }
}

export default Game;
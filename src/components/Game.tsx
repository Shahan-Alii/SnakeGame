import React, { useEffect, useState } from 'react';

import { View, Text, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { Colors } from '../styles/colors';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Coordinate, Direction } from '../types/types';
import Snake from './Snake';
import { checkGameOver } from '../utils/checkGameOver';
import Food from './Food';
import { checkEatsFood } from '../utils/checkEatsFood';
import { randomFoodPosition } from '../utils/randomFruitPosition';
import Header from './Header';
import Score from './Score';

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 31, yMin: 0, yMax: 63 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

export default function componentName(): JSX.Element {
    const [direction, setDirection] = useState<Direction>(Direction.Right);
    const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
    const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);

    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);

    const handleGesture = (event: any) => {
        const { translationX, translationY } = event.nativeEvent;
        console.log(translationX, translationY);

        if (Math.abs(translationX) > Math.abs(translationY)) {
            if (translationX > 0) {
                //moving right
                setDirection(Direction.Right);
            } else {
                //moving left
                setDirection(Direction.Left);
            }
        } else {
            if (translationY > 0) {
                //moving down
                setDirection(Direction.Down);
            } else {
                //moving up
                setDirection(Direction.Up);
            }
        }
    };

    useEffect(() => {
        if (!isGameOver) {
            const intervalId = setInterval(() => {
                !isPaused && moveSnake();
            }, MOVE_INTERVAL);
            return () => clearInterval(intervalId);
        }
    }, [snake, isGameOver, isPaused]);

    const moveSnake = () => {
        const snakeHead = snake[0];
        const newHead = { ...snakeHead }; // create a new head object to avoid mutating the original head

        // GAME OVER

        if (checkGameOver(snakeHead, GAME_BOUNDS)) {
            setIsGameOver((prev) => !prev);
            return;
        }

        switch (direction) {
            case Direction.Up:
                newHead.y -= 1;
                break;
            case Direction.Down:
                newHead.y += 1;
                break;
            case Direction.Left:
                newHead.x -= 1;
                break;
            case Direction.Right:
                newHead.x += 1;
                break;
            default:
                break;
        }

        if (checkEatsFood(newHead, food, 2)) {
            setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
            setSnake([newHead, ...snake]);
            setScore(score + SCORE_INCREMENT);
        } else {
            setSnake([newHead, ...snake.slice(0, snake.length - 1)]);
        }
    };

    const reloadGame = () => {
        setSnake(SNAKE_INITIAL_POSITION);
        setFood(FOOD_INITIAL_POSITION);
        setIsGameOver(false);
        setScore(0);
        setDirection(Direction.Right);
        setIsPaused(false);
    };

    const pauseGame = () => {
        setIsPaused(!isPaused);
    };

    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <SafeAreaView
                style={[
                    styles.container,
                    { backgroundColor: isGameOver ? 'red' : Colors.primary },
                ]}
            >
                <StatusBar />
                <Header
                    reloadGame={reloadGame}
                    pauseGame={pauseGame}
                    isPaused={isPaused}
                >
                    <Score score={score} />
                </Header>

                <View style={styles.boundaries}>
                    <Snake snake={snake} />
                    <Food x={food.x} y={food.y} />
                </View>
            </SafeAreaView>
        </PanGestureHandler>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        padding: 5,
    },
    boundaries: {
        flex: 1,
        borderColor: Colors.primary,
        borderWidth: 12,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: Colors.background,
    },
});

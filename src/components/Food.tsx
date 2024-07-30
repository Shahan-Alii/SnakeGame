import { StyleSheet, Text, View } from 'react-native';
import { Coordinate } from '../types/types';
import { useMemo } from 'react';

function getRandomFruitEmoji() {
    const fruitEmojis = ['🍎', '🍊', '🍋', '🍇', '🍉', '🍓', '🍑', '🍍'];
    const randomIndex = Math.floor(Math.random() * fruitEmojis.length);
    return fruitEmojis[randomIndex];
}

export default function Food({ x, y }: Coordinate): JSX.Element {
    const emoji = useMemo(() => getRandomFruitEmoji(), [x, y]);
    return (
        <Text style={[{ top: y * 10, left: x * 10 }, styles.food]}>
            {emoji}
        </Text>
    );
}

const styles = StyleSheet.create({
    food: {
        width: 20,
        height: 20,
        borderRadius: 7,
        position: 'absolute',
    },
});

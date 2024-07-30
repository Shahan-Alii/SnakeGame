import { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../styles/colors';
import { Coordinate } from '../types/types';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface SnakeProps {
    snake: Coordinate[];
}

export default function Snake({ snake }: SnakeProps): JSX.Element {
    return (
        <Fragment>
            {snake.map((segment: any, index: number) => {
                const segmentStyle = {
                    left: segment.x * 10, // adjust for the size of each segment
                    top: segment.y * 10,
                };
                return index == 0 ? (
                    <FontAwesome6
                        key={index}
                        name="face-smile"
                        size={24}
                        color="black"
                        style={segmentStyle}
                    />
                ) : (
                    <View key={index} style={[styles.snake, segmentStyle]} />
                );
            })}
        </Fragment>
    );
}
const styles = StyleSheet.create({
    snake: {
        width: 24,
        height: 24,
        borderRadius: 39,
        backgroundColor: Colors.primary,
        position: 'absolute',
    },
});

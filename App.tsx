import { View, Text } from 'react-native';
import React from 'react';
import Game from './src/components/Game';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Game />
        </GestureHandlerRootView>
    );
}

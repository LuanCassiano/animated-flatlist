import React, { useRef } from 'react';
import { View, FlatList, Text, Image, StatusBar, Animated } from 'react-native';

import DATA from './data.json';

const ITEM_SIZE = 70 + 20 * 3;

const AnimatedFlatlist: React.FC = () => {
    const scrollY = useRef(new Animated.Value(0)).current;

    return (
        <View style={{ flex: 1, backgroundColor: '#1c2331' }}>
            <FlatList
                data={DATA}
                keyExtractor={item => item.key}
                contentContainerStyle={{
                    padding: 20,
                    paddingTop: StatusBar.currentHeight || 42,
                }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false },
                )}
                renderItem={({ item, index }) => {
                    const inputRange = [
                        -1,
                        0,
                        ITEM_SIZE * index,
                        ITEM_SIZE * (index + 2),
                    ];

                    const opacityInputRange = [
                        -1,
                        0,
                        ITEM_SIZE * index,
                        ITEM_SIZE * (index + 1),
                    ];

                    const scale = scrollY.interpolate({
                        inputRange,
                        outputRange: [1, 1, 1, 0],
                    });

                    const opacity = scrollY.interpolate({
                        inputRange: opacityInputRange,
                        outputRange: [1, 1, 1, 0],
                    });

                    return (
                        <Animated.View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 20,
                                borderRadius: 20,
                                marginBottom: 20,
                                backgroundColor: '#fff',
                                transform: [{ scale }],
                                opacity,
                            }}
                        >
                            <Image
                                source={{ uri: item.image }}
                                style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: 70,
                                    marginRight: 10,
                                }}
                            />

                            <View>
                                <Text
                                    style={{ fontSize: 22, fontWeight: '700' }}
                                >
                                    {item.name}
                                </Text>
                                <Text style={{ fontSize: 16, opacity: 0.7 }}>
                                    {item.title}
                                </Text>
                            </View>
                        </Animated.View>
                    );
                }}
            />
        </View>
    );
};

export default AnimatedFlatlist;

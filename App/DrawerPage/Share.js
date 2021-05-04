import React from 'react';
import { View, Text } from 'react-native';
import { Header } from '../Component/Header';

export default function Share(props) {

    return (
        <View style={{ flex: 1 }}        >
            <Header
                title='Tell a Friend'
            />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}            >

                <Text>Tell a Friend</Text>
            </View>
        </View>
    )
}
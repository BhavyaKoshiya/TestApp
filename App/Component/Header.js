import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { menuIcon } from "../assets/icon";
import { useNavigation } from '@react-navigation/native';

export function Header({ title, headerContainerStyle, headerTitleStyle }) {

    const navigation = useNavigation();

    return (

        <View style={[styles.headerContainer, headerContainerStyle]}>

            <TouchableOpacity onPress={() => { navigation.toggleDrawer() }}>
                <View style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={styles.backIcon}
                        source={menuIcon}
                    />
                </View>
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>

                <Text style={[styles.headerTitle, headerTitleStyle]}>{title}</Text>
            </View>
            <View style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}/>
        </View>
    )

}

const styles = StyleSheet.create({

    headerContainer: {
        height: 60,
        width: '100%',
        paddingHorizontal: 10,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
        // borderTopWidth: 1,
        backgroundColor: '#3875ea',
        // backgroundColor: 'rgba(0, 85, 255, 0.15)',
    },
    headerTitle: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    backIcon: {
        width: 25,
        height: 25,
        tintColor: '#fff',
        resizeMode: 'contain',
    },
})
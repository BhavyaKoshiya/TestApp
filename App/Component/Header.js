import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { menuIcon } from "../assets/icon";
import { useNavigation } from '@react-navigation/native';

export function Header({ title, headerContainerStyle, headerTitleStyle }) {

    const navigation = useNavigation();

    return (

        <View style={[styles.headerContainer, headerContainerStyle]}>

            <TouchableOpacity
                onPress={() => { navigation.toggleDrawer(); }}
            >
                <Image
                    style={styles.backIcon}
                    source={menuIcon}
                />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>

                <Text style={[styles.headerTitle, headerTitleStyle]}>{title}</Text>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({

    headerContainer: {
        height: 60,
        width: '100%',
        paddingHorizontal: 25,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
        // borderTopWidth: 1,
        backgroundColor: '#111111',
        // backgroundColor: 'rgba(0, 85, 255, 0.15)',
    },
    headerTitle: {
        fontSize: 24,
        color: '#595959',
        fontWeight: 'bold',
    },
    backIcon: {
        width: 20,
        height: 20,
        tintColor: '#fff',
        resizeMode: 'contain',
    },
})
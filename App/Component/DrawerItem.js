import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";



export function DrawerItem({ source, onPress, iconStyle, title, contentContainerStyle, titleTextStyle, isActive, ...other }) {


    return (
        <View style={styles.container}>

            <TouchableOpacity
                onPress={onPress}
                {...other}
            >
                <View style={[isActive ? { backgroundColor: '#dbedff' } : { backgroundColor: 'transparent' }, styles.tabContainer, contentContainerStyle]}>

                    {source && <Image style={[isActive ? { tintColor: '#3875ea' } : { tintColor: '#000' },styles.tabIcon, iconStyle]} source={source} />}

                <Text style={[isActive ? { color: '#3875ea' } : { color: '#000' },styles.tabTitle, titleTextStyle]}>{title}</Text>
                </View>
            </TouchableOpacity>
        </View >
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 7
    },
    tabIcon: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
        marginRight: 10,
        paddingHorizontal: 20
    },
    tabTitle: {
        fontSize: 18,
    },
    spaceDivider: {
        height: 30,
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: 'lightgrey'
    },
    imageContainer: {
        height: 80,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 80
    },
    image: {
        height: 80,
        width: 80,
        borderRadius: 80
    },

})
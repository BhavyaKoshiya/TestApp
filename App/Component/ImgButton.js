import React from 'react';
import { View, Text, TextInput, iconStyle, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import {  } from '../assets/Icon'

export function ImageButton({
    isChecked,
    source,
    onPress,
    title,
    contentContainerStyle,
    imageStyle,
    titleStyle,
    ...Other
}) {

    return (
        <TouchableOpacity
            onPress={onPress} {...Other}>
            <View style={[styles.buttonContainer, contentContainerStyle]}>
                <View style={{ flexDirection: 'row', alignItems: "center" }} >
                    <View>
                        <Image source={source} style={[styles.iconStyle, imageStyle]} />
                    </View>

                    {title && <Text style={[styles.titleText, titleStyle]}> {title}</Text>}
                </View>
            </View>
        </TouchableOpacity>

    )
}
const styles = StyleSheet.create({
    buttonContainer: {
        height: 50,
        borderRadius: 10,
        paddingHorizontal:15,
        justifyContent: "center",
        alignItems: "center", 
        alignSelf:'center'
    },
    iconStyle: {
        width: 30,
        height: 30,
        resizeMode: "contain",
        
    },
    titleText: {
        color: 'white',
        marginLeft: 10,
        fontSize: 18
    }

});

import React, { useState, useEffect } from "react";
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, ToastAndroid, PermissionsAndroid, Alert, Image } from "react-native";
import { deleteIcon, editIcon } from '../assets/icon/index';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { Header } from "../Component/Header";




export default function CloudStorage(props) {

    useEffect(() => {

    }, [])

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);


    const pickFromGallery = () => {
        ImagePicker.openPicker({
        }).then(image => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageUri);
        });

    }
    const pickFromCamera = async () => {

        try {
            let response = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
            if (response === 'granted') {
                ImagePicker.openCamera({
                }).then(image => {
                    console.log(image);
                    const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
                    setImage(imageUri);
                });
            } else {
                ToastAndroid.show('Permission Denied', ToastAndroid.LONG)
            }

        } catch (error) {
            ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG)
        }

    }

    const uploadImage = async () => {
        if (image == null) {
            return null;
        }
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;

        setUploading(true);
        setTransferred(0);

        const storageRef = storage().ref(`photos/${filename}`);
        const task = storageRef.putFile(uploadUri);

        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );

            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100,
            );
        });

        try {
            await task;

            const url = await storageRef.getDownloadURL();

            setUploading(false);
            setImage(null);

            Alert.alert(
                'Image uploaded!',
                'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
            );
            console.log(url);
            return url;

        } catch (e) {
            console.log(e);
            return null;
        }

    };
    return (
        <View style={styles.container}>
            {/* <Text style={styles.titleText}>Cloud Storage</Text> */}
            <Header
                title='Cloud Storage'
            />
            <View style={styles.spaceDivider} />

            <View style={{ flexDirection:'row', justifyContent:'center' }}>
                <TouchableOpacity style={styles.button} onPress={pickFromGallery} >
                    <Text style={{ color: '#fff' }}>Pick Image From Gallery</Text>
                </TouchableOpacity>
                <View style={{width:5}} />

                <TouchableOpacity style={styles.button} onPress={pickFromCamera} >
                    <Text style={{ color: '#fff' }}>Pick Image From Camera</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.spaceDivider} />

            <TouchableOpacity style={[styles.button,{marginHorizontal:10}]} onPress={uploadImage} >
                <Text style={{ color: '#fff' }}>Upload</Text>
            </TouchableOpacity>
            <View style={styles.spaceDivider} />


            {uploading &&
                <Text style={{ alignSelf: 'center' }}> {transferred}% Uploaded </Text>
            }

            <Image style={{ height: 600, width: 425, alignSelf: 'center', resizeMode:'contain' }} source={{ uri: image }} />


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleText: {
        fontSize: 40,
        alignSelf: 'center',
        fontWeight: 'bold',
        color: '#595959'
    },

    spaceDivider: {
        height: 15
    },
    button: {
        backgroundColor: '#3875ea',
        borderRadius: 30,
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15
    }

});


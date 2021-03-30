import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import { FlatList, ScrollView, } from 'react-native-gesture-handler';
import { closeIcon, rightIcon, leftIcon } from "../assets/icon/index";
import ImageView from "react-native-image-viewing";
import Modal from 'react-native-modal';


export default function Gallery(props) {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [visible, setIsVisible] = useState(false);
    const [imageIndex, setimageIndex] = useState(0);

    const [isModalVisible, setModalVisible] = useState(false);


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const images = [
        {
            id: 1,
            uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
        },
        {
            id: 2,
            uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
        },
        {
            id: 3,
            uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
        },
        {
            id: 4,
            uri: "https://images.unsplash.com/photo-1494548162494-384bba4ab999",
        },
        {
            id: 5,
            uri: "https://images.unsplash.com/photo-1579722139701-f9222eded3b6",
        },
    ];


    const renderItem = ({ item, index }) => {

        return <View style={styles.item}>
            <TouchableOpacity
                onPress={() => setIsVisible(true)}
                onPressIn={() => setimageIndex(index)}>
                <Image
                    style={styles.image}
                    source={{ uri: item.uri }}
                />
            </TouchableOpacity>
        </View>
    }
    const renderItemSingle = ({ item, index }) => {

        return <View style={styles.item}>
            <TouchableOpacity
                onPress={() => toggleModal()}
                onPressIn={() => setimageIndex(index)}>
                <Image
                    style={styles.image}
                    source={{ uri: item.uri }}
                />
            </TouchableOpacity>
        </View>
    }

    const nextImage = () => {
        if (imageIndex < images.length) {
            setimageIndex(imageIndex + 1)
        }
    }
    const prevImage = () => {
        if (imageIndex > 0) {
            setimageIndex(imageIndex - 1)
        }
    }

    const footerComponent = () => {

        return <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', paddingBottom:20}}>

            <TouchableOpacity
                onPress={prevImage}
                style={{paddingHorizontal:15}}
            >
                <Image source={leftIcon} style={{ height: 25, width: 25, alignSelf: 'center', tintColor: '#fff', }} />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={nextImage}
                style={{paddingHorizontal:15}}
            >
                <Image source={rightIcon} style={{ height: 25, width: 25, alignSelf: 'center', tintColor: '#fff', }} />
            </TouchableOpacity>
        </View>
        

    }


    return (
        <SafeAreaView
            style={{ flex: 1 }}
        >

            <View style={{ height: 10 }} />
            <Text style={{ alignSelf: 'center', paddingVertical: 10 }}>Gallery</Text>
            <View style={{ padding: 10 }}>

                <ImageView
                    images={images}
                    imageIndex={imageIndex}
                    visible={visible}
                    FooterComponent={footerComponent}
                    onRequestClose={() => setIsVisible(false)}
                />

                <FlatList
                    numColumns={3}
                    style={styles.container}
                    data={images}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />

            </View>

            <View style={{ height: 10 }} />
            <Text style={{ alignSelf: 'center', paddingVertical: 10 }}>Gallery - Single</Text>

            <View style={{ padding: 10 }}>

                <Modal isVisible={isModalVisible}
                    onBackButtonPress={() => toggleModal()}
                    animationIn='slideInUp'
                    animationOut='slideOutDown'
                    style={{ margin: 0, justifyContent: 'flex-end' }}
                    useNativeDriver={true}
                    hideModalContentWhileAnimating={true}
                    backdropOpacity={1}
                    backdropColor='#000'
                >

                    <View style={{ flex: 1, width: '100%', height: '100%' }}>


                        <View style={{ backgroundColor: '#000', alignSelf: 'flex-end', height: 40, width: 40, justifyContent: 'center', borderRadius: 40, margin: 10 }}>

                            <TouchableOpacity
                                onPress={() => { setModalVisible(false) }}>
                                <Image
                                    source={closeIcon}
                                    style={{ height: 25, width: 25, alignSelf: 'center', tintColor: '#fff', }} />
                            </TouchableOpacity>
                        </View>
                        <Image
                            style={{ height: windowHeight, width: windowWidth, resizeMode: 'contain', }}
                            source={{
                                uri: images[imageIndex].uri,
                            }}
                        />
                    </View>
                </Modal>

                <FlatList
                    numColumns={3}
                    style={styles.container}
                    data={images}
                    renderItem={renderItemSingle}
                    keyExtractor={item => item.id}

                />
            </View>
        </SafeAreaView >
    )
}
const styles = StyleSheet.create({

    background: {
        backgroundColor: 'black',
        flex: 1
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: "contain"
    },
    item: {
        padding: 4,
        flex: 1,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 8,
        marginHorizontal: 5,
        elevation: 5,
    },
});
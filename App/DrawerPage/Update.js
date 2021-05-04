import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import database from '@react-native-firebase/database';
import { InputWithIcon } from '../Component/Inputs';



export default function Update({ route, navigation }) {

    // console.log(route.params.item);
    const [Name, setName] = useState('');
    const [Surname, setSurname] = useState('');
    var Id = route.params.item.Id;


    useEffect(() => {

        setName(route.params.item.Name);
        setSurname(route.params.item.Surname);

    }, [])

    const updateData = () => {
        return new Promise(function (resolve, reject) {
            let key;
            if (Id != null) {
                key = Id;
            } else {
                alert('key Invalid!')
            }
            let dataToSave = {
                Id: key,
                Name: Name,
                Surname: Surname,
            };
            database()
                .ref('users/' + key)
                .update(dataToSave)
                .then(snapshot => {
                    resolve(snapshot);
                })
                .catch(err => {
                    reject(err);
                });
        });
    };

    const deleteData = () => {
        database()
            .ref('users/' + Id)
            .remove()
            .then(() => {
                alert('Data Deleted From Firebase !\nBut you can still restore it by pressing update data button ') /*ToastAndroid.show("Data Deleted From Firebase !", ToastAndroid.SHORT)*/;
            })
            .catch((e) => {
                console.log(e);
            });

    };



    return (
        <SafeAreaView style={styles.container} >
            <View style={{ borderColor: '#9a09ff', borderWidth: 1, borderRadius: 15 }}>
                <View style={{ height: 10 }} />

                <Text style={styles.titleText}>Update Data</Text>
                <View style={styles.spaceDivider} />

                <View style={{ margin: 15, }}>
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={styles.header}>{'ID: ' + Id}</Text>
                    </View>
                    <View style={styles.spaceDivider} />

                    <View style={{ height: 10 }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                        <InputWithIcon
                            placeholder='Name'
                            selectionColor={'#9a09ff'}
                            value={Name}
                            title={'Name'}
                            titleStyle={{ color: '#595959' }}
                            onChangeText={text => setName(text)}
                            contentContainerStyle={{ backgroundColor: '#F2F2F2', borderWidth: 1, borderColor: '#9a09ff', height: 40, width: 170 }}
                        />
                        <View style={{ width: 15 }} />
                        <InputWithIcon
                            placeholder='Surname'
                            value={Surname}
                            title={'Surname'}
                            titleStyle={{ color: '#595959' }}
                            selectionColor={'#9a09ff'}
                            onChangeText={text => setSurname(text)}
                            contentContainerStyle={{ backgroundColor: '#F2F2F2', borderWidth: 1, borderColor: '#9a09ff', height: 40, width: 170 }}
                        />

                    </View>
                    <View style={styles.spaceDivider} />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={updateData}
                    >
                        <Text style={{ alignSelf: "center", textTransform: "uppercase", fontSize: 20, color: 'white' }}>update data</Text>
                    </TouchableOpacity>

                    <View style={styles.spaceDivider} />

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: 'red' }]}
                        onPress={deleteData}
                    >
                        <Text style={{ alignSelf: "center", textTransform: "uppercase", fontSize: 20, color: 'white' }}>delete data</Text>
                    </TouchableOpacity>

                    <View style={styles.spaceDivider} />

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: 'dodgerblue' }]}
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Text style={{ alignSelf: "center", textTransform: "uppercase", fontSize: 20, color: 'white' }}>Go Back</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 20,
        color: 'dodgerblue'
    },
    spaceDivider: {
        height: 15
    },
    button: {
        backgroundColor: '#9a09ff',
        borderRadius: 30,
        paddingVertical: 7,
        paddingHorizontal: 30
    },
    titleText: {
        fontSize: 40,
        alignSelf: 'center',
        fontWeight: 'bold',
        color: '#595959'
    },
})
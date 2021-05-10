import React, { useState, useEffect } from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity, Alert, LogBox } from "react-native";
import { deleteIcon, editIcon } from '../assets/icon/index';
import { InputWithIcon } from '../Component/Inputs';
import database from '@react-native-firebase/database';
import { FlatList } from "react-native-gesture-handler";
import { Header } from "../Component/Header";

LogBox.ignoreLogs([
    'Encountered two children with the same key',
]);

export default function RealTimeDB(props) {

    useEffect(() => {

        const userRef = database().ref('/users');
        const OnLoadingListener = userRef.on('value', (snapshot) => {
            setUsers([])
            snapshot.forEach(function (childSnapshot) {
                setUsers((users) => [...users, childSnapshot.val()]);
            });
        });

    }, [])

    const [Name, setName] = useState('');
    const [Surname, setSurname] = useState('');
    const [users, setUsers] = useState([]);

    const addData = () => {
        return new Promise(function (resolve, reject) {
            let key = database()
                .ref()
                .push().key;

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
                    setName('')
                    setSurname('')
                })
                .catch(err => {
                    reject(err);
                });
        });
    };


    const deleteAll = () => {
        return new Promise((resolve, reject) => {

            Alert.alert(
                "Delete all data ?",
                "All data will be lost if you confirm.",
                [
                    {
                        text: "No",
                        onPress: () => {
                            resolve(false);
                        }
                    },
                    {
                        text: "Yes, Delete all.",
                        style: "cancel",
                        onPress: () => {
                            database().ref('users').remove();
                            resolve(true);
                        }
                    }
                ],
                { cancelable: false }
            );
        });
        // database().ref('users').remove();
    };

    const renderItem = ({ item }) => (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ padding: 10 }}>
                <Text>Name: {item.Name}</Text>
                <Text>Surname: {item.Surname}</Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
                <TouchableOpacity
                    onPress={(index) => {
                        props.navigation.navigate('Update', { item })
                    }}
                >
                    <Image source={editIcon} style={{ height: 20, width: 20, tintColor: '#3875ea' }} />
                </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <View style={styles.container}>
            <Header
                title='Realtime DataBase'
            />
            {/* <Text style={styles.titleText}>Realtime DataBase</Text> */}


            <View style={{ paddingHorizontal: 20, marginTop: 10, }}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'red' }]}
                    onPress={deleteAll}

                >
                    <Text style={{ alignSelf: "center", textTransform: "uppercase", fontSize: 20, color: 'white' }}>⚠️ Delete All Data ⚠️</Text>
                </TouchableOpacity>
                <View style={styles.spaceDivider} />

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                    <InputWithIcon
                        placeholder='Name'
                        selectionColor={'#3875ea'}
                        value={Name}
                        onChangeText={text => setName(text)}
                        contentContainerStyle={{ backgroundColor: '#F2F2F2', borderWidth: 1, borderColor: '#3875ea', height: 40, width: 170 }}
                    />
                    <View style={{ width: 15 }} />
                    <InputWithIcon
                        placeholder='Surname'
                        value={Surname}
                        selectionColor={'#3875ea'}
                        onChangeText={text => setSurname(text)}
                        contentContainerStyle={{ backgroundColor: '#F2F2F2', borderWidth: 1, borderColor: '#3875ea', height: 40, width: 170 }}
                    />

                </View>
                <View style={styles.spaceDivider} />

                <TouchableOpacity
                    style={styles.button}
                    onPress={addData}
                >
                    <Text style={{ alignSelf: "center", textTransform: "uppercase", fontSize: 20, color: 'white' }}>add data</Text>
                </TouchableOpacity>


                <FlatList
                    data={users}
                    keyExtractor={item => item.Id}
                    renderItem={renderItem}
                />


            </View>
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
        paddingVertical: 7,
        paddingHorizontal: 30
    }

});


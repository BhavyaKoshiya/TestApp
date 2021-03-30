import React, { useState, useEffect } from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { checkIcon, closeIcon, crossIcon, tickIcon, editIcon } from '../assets/icon/index';
import { InputWithIcon } from '../Component/Inputs';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from "react-native-gesture-handler";


export default function Firestore(props) {

    const ref = firestore().collection('todos');
    const [loading, setLoading] = useState(true);
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);

    useEffect(() => {

        return ref.onSnapshot(querySnapshot => {
            const list = [];
            querySnapshot.forEach(doc => {
                const { title, complete } = doc.data();
                list.push({
                    id: doc.id,
                    title,
                    complete,
                });
            });
            setTodos(list);

            if (loading) {
                setLoading(false);
            }
        });

    }, []);


    async function addTodo() {
        if (todo == '') {
            alert('Please enter TODO Task, It can\'t be empty.')
        } else {
            await ref.add({
                title: todo,
                complete: false,
            });
            setTodo('');
        }

    }

    async function toggleComplete(item) {
        console.log(item);
        await ref.doc(item.id)
            .update({
                complete: !item.complete,
            });
    }

    if (loading) {
        return null;
    }
    const renderItem = ({ item }) => (
        <View style={{ flex: 1, flexDirection: 'row', padding: 2, alignItems:'center' }}>

            <TouchableOpacity style={styles.checkboxContainer}
                onPress={() => toggleComplete(item)}>
                <Image source={item.complete ? tickIcon : crossIcon} style={item.complete ? styles.checkTrueStyle : styles.checkFalseStyle} />
            </TouchableOpacity>
            <Text style={{ color: '#000', marginLeft: 10, fontSize:16 }}>{item.title}</Text>
        </View>

    )
    return (
        <View style={styles.container}>
            <View style={styles.spaceDivider} />

            <Text style={styles.titleText}>Cloud Firestore</Text>

            <View style={{ paddingHorizontal: 20 }}>
                <View style={styles.spaceDivider} />

                <InputWithIcon
                    placeholder='New TODO'
                    selectionColor={'#ea8478'}
                    value={todo}
                    onChangeText={text => setTodo(text)}
                    contentContainerStyle={{ backgroundColor: '#F2F2F2', borderWidth: 1, borderColor: '#ea8478', height: 40 }}
                />
                <View style={styles.spaceDivider} />

                <TouchableOpacity
                    style={styles.button}
                    onPress={addTodo}
                >
                    <Text style={{ alignSelf: "center", textTransform: "uppercase", fontSize: 20, color: 'white' }}>add todo</Text>
                </TouchableOpacity>
                <View style={styles.spaceDivider} />

                <View style={{ padding: 10 }}>

                    <Text style={{ fontSize: 18, alignSelf: 'center', fontWeight: 'bold', color: '#595959', textDecorationLine: 'underline' }}>List of TODOs!</Text>
                    <View style={styles.spaceDivider} />

                    <FlatList
                        data={todos}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                    />
                </View>

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
        backgroundColor: '#ea8478',
        borderRadius: 30,
        paddingVertical: 7,
        paddingHorizontal: 30
    },
    checkboxContainer: {
        borderWidth: 1,
        borderColor: "#ea8478",
        width: 20,
        height: 20,
        borderRadius: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    //red: #d71a18
    checkFalseStyle: {
        width: 12,
        height: 12,
        resizeMode: "contain",
        tintColor: "#d71a18"
    },
    //green: #29d31b
    checkTrueStyle: {
        width: 12,
        height: 12,
        resizeMode: "contain",
        tintColor: "#29d31b"
    },

});


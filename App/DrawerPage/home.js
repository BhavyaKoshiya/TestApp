import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { firebase } from "@react-native-firebase/auth"

export default function Home() {

  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState('')
  const [authenticated, setAuthenticated] = useState(true)

  useEffect(() => {

    isTheUserAuthenticated();
    
  }, [userId])

  const isTheUserAuthenticated = () => {
    try {

      let user = firebase.auth().currentUser;

      if (user) {
        setUserId(user.uid)
        setEmail(user.email)
        setAuthenticated(true);

      } else {
        console.log("no user found");
        setAuthenticated(false);
      }
    } catch (e) {
      console.error('error: ', e.message)

    }
  }

  const logOut = async () => {

    await firebase.auth().signOut();
    console.log('Logged Out!');
    setAuthenticated(false)


  }
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>HOME</Text>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {
          authenticated ? <Text>UserID: {userId}</Text> : <Text>No User Found</Text>
        }
        {
          authenticated &&
          <Text>Email: {email}</Text>
        }
        <View style={styles.spaceDivider} />
        {
          authenticated &&

          <TouchableOpacity
            style={styles.button}
            onPress={logOut}
          >
            <Text style={{ alignSelf: "center", textTransform: "uppercase", fontSize: 20, color: 'white' }}>LOGOUT</Text>
          </TouchableOpacity>

        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: '#9a09ff',
    borderRadius: 30,
    alignSelf: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30
  },
  spaceDivider: {
    height: 15
  },
  titleText: {
    fontSize: 26,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#595959',
    marginTop: 50
  },
});

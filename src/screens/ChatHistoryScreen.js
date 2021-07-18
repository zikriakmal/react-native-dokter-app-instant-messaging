import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { FlatList, RectButton } from 'react-native-gesture-handler';
import ChatChildComponent from '../component/atoms/ChatChildComponent';
import Swipeout from 'react-native-swipeout';
import { useState } from 'react';
import { Button } from 'react-native-paper';

import { firebase } from '../../firebase';


// Buttons
let swipeoutBtns = [
    {
        text: 'Delete',
        onPress: () => { alert('hehe') }
    }
]



const data = [
    { id: '1', name: 'Dokter Subandono', lastChat: 'Lagi apa nue' },
    { id: '2', name: 'Dokter SitiHajar', lastChat: 'Sini Om bantu' },
    { id: '3', name: 'Dokter Ku Doktermu', lastChat: 'Chaaaakss' },
    { id: '4', name: 'Dokter Ku Doktermu', lastChat: 'skahhhhhcc' },
    { id: '5', name: 'Dokter Ku Doktermu', lastChat: 'lol' },
    { id: '6', name: 'Dokter Ku Doktermu', lastChat: 'penyakit kurik' },
    { id: '7', name: 'Dokter Nugosyah', lastChat: 'bocor otak mu !!' }
];




const ChatHistoryScreen = ({ navigation }) =>
{
    const [closeApagak, setCloseApagak] = useState(1);
    const [chats, setChats] = useState([]);
    const [username, setUsername] = useState("");

    // useEffect(() =>
    // {

    const db = firebase.firestore();
    const query = db.collection('users').doc("userId1").collection("chats");

    useEffect(() =>
    {

        // Subscribe to query with onSnapshot
        const unsubscribe = query.onSnapshot(querySnapshot =>
        {
            // Get all documents from collection - with IDs
            const fetchedTasks = [];

            querySnapshot.docs.forEach(childSnapshot =>
            {

                // const query2 = db.collection('doctors').doc(childSnapshot.id);
                // const doc = query2.onSnapshot((hogs) =>
                // {
                    // return doc;
                    const key = childSnapshot.id;
                    const data = childSnapshot.data();
                    fetchedTasks.push({ id: key, nama: username, ...data });
                    setChats(fetchedTasks);
                // });
            });
        });
        // Detach listener
        return unsubscribe;
    }, []);

    console.log(chats[0])
    return (
        <SafeAreaView style={{ 'flex': 1 }} >


            <FlatList
                style={styles.container}
                data={chats}
                renderItem={({ item }) =>
                    // <Swipeout  right={swipeoutBtns}   autoClose={false}   backgroundColor="white">
                    <RectButton
                        style={{ borderColor: '#dddddd' }} rippleColor="#FF826B" onPress={() =>
                        {
                            navigation.navigate('ChatDetail', { name: item.id,id:item.id });
                        }}>
                        <ChatChildComponent style={styles.item} key={item.text} name={item.id} lastChat={item.text} navigation={navigation} />
                    </RectButton>
                    // </Swipeout> 

                }
            />
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: '#dddddd',
        margin: 10
    },
    item: {
        backgroundColor: 'red',
        borderWidth: 2,
        borderBottomColor: 'black',
    },
});

export default ChatHistoryScreen

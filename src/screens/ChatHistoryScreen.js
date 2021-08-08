import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { FlatList, RectButton } from 'react-native-gesture-handler';
import ChatChildComponent from '../component/atoms/ChatChildComponent';
import Swipeout from 'react-native-swipeout';
import { useState } from 'react';
import { Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { MMKV } from 'react-native-mmkv';


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

    const db = firestore();
    const query = db.collection('users').doc(MMKV.getString("userId")).collection("chats");

    let fetchedTasks = [];

    useEffect(() =>
    {

        // Subscribe to query with onSnapshot
        const unsubscribe = query.onSnapshot(querySnapshot =>
        {
            // Get all documents from collection - with IDs

            querySnapshot.docChanges().forEach((change) =>
            {
                if (change.type === 'added') {
                    const query2 = db.collection('doctors').doc(change.doc.id);
                    const doc = query2.get().then((hogs) =>
                    {
                        const key = change.doc.id;
                        const data = change.doc.data();
                        const preve = { id: key, datadoctor: hogs.data(), data }
                        setChats((prev) => ([...prev, preve]));
                        fetchedTasks.push(preve)
                    });
                    return () => query2();
                }
                if (change.type === 'modified') {

                    const query2 = db.collection('doctors').doc(change.doc.id);
                    const doc = query2.get().then((hogs) =>
                    {

                        const key = change.doc.id;
                        const data = change.doc.data();
                        const preve = { id: key, datadoctor: hogs.data(), data }
                        const index = fetchedTasks.findIndex((data) => { return data.id == change.doc.id })
                        fetchedTasks[index] = preve
                        setChats(fetchedTasks.map(item=> item.id == change.doc.id ? {...item, preve}: item));

                    });
                    return () => query2();
                }
            });
        });
        // Detach listener
        return () => unsubscribe();
    }, []);


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
                            navigation.navigate('ChatDetail', { name: item.datadoctor.name, id: item.id });
                        }}>
                        <ChatChildComponent style={styles.item} key={item.text} name={item.datadoctor.name} lastChat={item.data.last_chat} navigation={navigation} />
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

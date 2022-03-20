import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image } from 'react-native'
import { FlatList, RectButton } from 'react-native-gesture-handler';
import ChatChildComponent from '../component/atoms/ChatChildComponent';
import { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { MMKV } from 'react-native-mmkv';
import GlobalButton from '../component/atoms/GlobalButton';
import { GetInfo } from '../services/user.service';


// Buttons
let swipeoutBtns = [
    {
        text: 'Delete',
        onPress: () => { alert('hehe') }
    }
]


const ChatHistoryScreen = ({ navigation }) =>
{
    const [chats, setChats] = useState([]);
    const db = firestore();
    const query = db.collection(MMKV.getNumber('type') == 1 ? "users" : "doctors").doc(MMKV.getString("userId")).collection("chats");
    const performHistory = MMKV.getNumber('type') == 2 ? "users" : "doctors";

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
                    const query2 = db.collection(performHistory).doc(change.doc.id);
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

                    const query2 = db.collection(performHistory).doc(change.doc.id);
                    const doc = query2.get().then((hogs) =>
                    {

                        const key = change.doc.id;
                        const data = change.doc.data();
                        const preve = { id: key, datadoctor: hogs.data(), data }
                        const index = fetchedTasks.findIndex((data) => { return data.id == change.doc.id })
                        fetchedTasks[index] = preve
                        setChats(fetchedTasks.map(item => item.id == change.doc.id ? { ...item, preve } : item));

                    });
                    return () => query2();
                }
            });
        });

        GetInfo().then((data) =>
        {

            MMKV.set('userId', data.data.data.firebase_id);
            MMKV.set('username', data.data.data.username);
            MMKV.set('email', data.data.data.email);
            MMKV.set('photoProfile', data.data.data.photo_path);
            MMKV.set('phoneNumber', data.data.data.phone_number)
            MMKV.set('type', data.data.data.member_type);
        });
        // Detach listener
        return () => unsubscribe();
    }, []);


    console.log(chats);
    return (
        <SafeAreaView style={{ 'flex': 1 }} >
            <View style={{ height: '100%', marginTop: 40 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginHorizontal: 30 }}>Percakapan</Text>
                {chats.length != 0 ?
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
                                <ChatChildComponent
                                    style={styles.item}
                                    key={item.text}
                                    name={item.datadoctor.name}
                                    photoPath={item.datadoctor.photo_path}
                                    lastChat={item.data.last_chat} navigation={navigation} />
                            </RectButton>
                            // </Swipeout> 
                        }
                    /> :
                    <View style={{ paddingHorizontal: 20, paddingTop: 10, paddingBottom: 5 }}>
                        <View style={{ marginVertical: 50, height: "50%" }}>
                            <Image source={require('../assets/nodata.png')} style={{ 'width': "75%", alignSelf: 'center', 'height': 200 }} />
                            <Text style={{ color: 'tomato', fontWeight: 'bold', alignSelf: 'center' }}>Belum ada percakapan</Text>
                            <Text style={{ color: 'tomato', fontWeight: 'bold', alignSelf: 'center' }}>Ayo mulai ajukan!</Text>
                        </View>
                    </View>
                }

            </View>
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

import React, { useEffect } from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { View, Text, TextInput ,SafeAreaView, StyleSheet, TouchableHighlight, Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import { MMKV } from 'react-native-mmkv';
import dateFormat from 'dateformat';



const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: '#dddddd',
        padding: 5,
        margin: 2,
        backgroundColor: 'white'
    },
    item: {
        backgroundColor: 'red',
        borderWidth: 2,
    },
});

const UselessTextInput = (props) =>
{
    return (
        <TextInput
            {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
            editable
            style={{ maxHeight: 40,height:40 }}
            placeholder="ketik disini!"

        />
    );
}

const FlatListBasics = ({ navigation, chat,replyName }) =>
{
    let myList = useRef();
    // useEffect((myList)=>{
    //     myList.current.scrollToIndex({animated:true,index:0,viewPosition:0});
    // })
    return (
        <View style={styles.container}>
            <FlatList
                ref={myList}
                onContentSizeChange={() => myList?.current?.scrollToEnd({ animated: true })} // scroll end
                data={chat}
                renderItem={({ item }) => <ChatChild style={styles.item} replyName ={replyName} key={item.data.id} text={item.data.text} date={ dateFormat(item.data.created_at.toDate(), "dd/mm/yyyy, H:MM")} type={item.data.type} navigation={navigation} />}
            // onScrollAnimationEnd={false}
            />
        </View>)
}

const ChatChild = ({ text, date, type,replyName, ...props }) =>
{
    return (

        <TouchableHighlight underlayColor="#DDDDDD" style={{
            alignSelf: type == 1 ? 'flex-end' : 'flex-start',
            borderTopStartRadius: type == 1 ? 10 : 30, borderTopRightRadius: type == 2 ? 10 : 30,
            borderRadius: 10, borderWidth: 0,
            backgroundColor: type == 1 ? 'tomato' : '#f2f2f2',
            borderColor: 'black', 'padding': 10, 'margin': 5, 'marginTop': 10
        }} onPress={() =>
        {
            console.log('tes')
        }}>
            <View style={{ width: '85%', 'display': 'flex', 'flexDirection': type == 1 ? 'row-reverse' : 'row' }}>
                <View style={{}}>
                    {/* <Image source={require('../assets/ayodokter.png')} style={{
                        width: 50,
                        height: 50,
                        borderRadius: 150 / 2,
                        overflow: "hidden",
                        borderWidth: 3,
                        borderColor: "tomato"
                    }} /> */}
                </View>
                <View style={{ 'display': 'flex', 'flexDirection': 'column', 'paddingHorizontal': 10 }}>
                    <Text style={{
                        alignSelf: type == 1 ? 'flex-end' : 'flex-start',
                        color: type == 1 ? 'black' : 'tomato',
                        fontSize: 15, fontWeight: 'bold'
                    }}>{type == 1 ? 'You' : replyName }</Text>
                    <Text style={{ color: type == 1 ? 'white' : 'black', fontSize: 14, fontWeight: '300' }}>{text}</Text>
                    <Text style={{ color: type == 1 ? 'white' : 'black', alignSelf: type == 1 ? 'flex-end' : 'flex-start', fontSize: 8, fontWeight: '800' }}>{date}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

// const addChat=;
const ChatDetailScreen = ({ route, navigation }) =>
{
    [inputChat, setInputChatState] = useState("");
    [chats, setChats] = useState([]);
    
    const userId = MMKV.getString('userId')
    const db = firestore();
    const query = db.collection(MMKV.getNumber('type') == 1 ?'users' : 'doctors').doc(userId).collection("chats").doc(route.params.id).collection("chats").orderBy('created_at', 'asc');

    useEffect(() =>
    {
        // Subscribe to query with onSnapshot
        const unsubscribe = query.onSnapshot(querySnapshot =>
        {
            const fetchedTasks = [];
            querySnapshot.docChanges().forEach((change) =>
            {
                // return doc;
                if (change.type === 'added') {
                    const key = change.doc.id;
                    const data = change.doc.data();
                    const preve = {id:key,data}
                    setChats((prev)=>([...prev,preve]));
                }
            });
        });
        // Detach listener
        return ()=>unsubscribe();
    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <View style={{ display: 'flex', 'flexDirection': 'column', height: '100%', backgroundColor: 'white', justifyContent: 'space-between' }}>
                <FlatListBasics chat={chats} replyName = {route.params.name} />
                <View style={{ display: 'flex', backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <View
                        style={{
                            elevation: 5,
                            borderRadius: 20,
                            padding: 5,
                            flex: 1,
                            backgroundColor: 'white',
                            marginHorizontal: 5,
                            shadowRadius: 3,
                            paddingHorizontal: 20, shadowOpacity: 0.5, shadowOffset: { width: 2, height: -1 }, shadowColor: 'black'

                        }}>
                        <UselessTextInput
                            multiline
                            onChangeText={(text) => setInputChatState(text)}
                            value={inputChat}

                        />
                    </View>
                    <TouchableHighlight
                        disabled={inputChat == ""}
                        underlayColor='#dddddd'
                        style={{
                            alignSelf: 'center',
                            maxHeight: 40,
                            borderRadius: 20,
                            padding: 5,
                            backgroundColor: 'tomato',
                            marginHorizontal: 10, shadowRadius: 3, shadowOpacity: 0.2, shadowOffset: { width: 2, height: -1 }, shadowColor: 'black'

                        }}

                        onPress={() =>
                        {
                            const type = MMKV.getNumber('type');
                            const userChat = db.collection('users').doc( type == 1 ? userId : route.params.id).collection("chats").doc(type == 1 ? route.params.id : userId).collection("chats");
                            userChat.add({
                                text: inputChat,
                                created_at: firestore.Timestamp.fromDate(new Date()),
                                type: type == 1 ? 1 : 2,
                                last_chat:inputChat
                            });

                            const doctorChat = db.collection('doctors').doc(type==1 ? route.params.id : userId).collection("chats").doc(type ==1 ? userId : route.params.id).collection("chats");
                            doctorChat.add({
                                text: inputChat,
                                created_at: firestore.Timestamp.fromDate(new Date()),
                                type: type == 2 ? 1 : 2,
                                last_chat:inputChat
                            });

                            const chats = {
                                last_chat: inputChat,
                            };
                            const cityRef = db.collection('users').doc(userId).collection("chats").doc(route.params.id);
                            const cityRef2 = db.collection('doctors').doc(route.params.id).collection("chats").doc(userId);
                            const res = cityRef.set(chats);
                            const res2 = cityRef2.set(chats);

                            setInputChatState("");
                        }}>

                        <Ionicons name="send" color='white' style={{ padding: 10, paddingVertical: 5 }} size={20} />
                    </TouchableHighlight>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ChatDetailScreen

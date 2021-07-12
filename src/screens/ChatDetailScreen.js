import React, { useEffect } from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, StyleSheet, TouchableHighlight, Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';




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


const data = [
    { id: '1', text: 'Dokter Subandono', date: '19:20:11', type: 1 },
    { id: '2', text: 'Dokter SitiHajar', date: '19:20:11', type: 2 },
    { id: '3', text: 'Dokter Ku Ddjalkdsjlfk kocok kocok kocko sajalah kamu ini', date: '19:10:10', type: 2 },
    { id: '4', text: 'Dokter Nugosyah', date: '19:20:11', type: 1 }

];



const UselessTextInput = (props) =>
{
    return (
        <TextInput
            {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
            editable
            style={{maxHeight:80}} 
            placeholder="ketik disini!"
            
        />
    );
}

const FlatListBasics = ({ navigation, chat }) =>
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
                renderItem={({ item }) => <ChatChild style={styles.item} text={item.text} date={item.date} type={item.type} navigation={navigation} />}
            // onScrollAnimationEnd={false}
            />
        </View>)
}

const ChatChild = ({ text, date, type, ...props }) =>
{
    //  const dispatch = useDispatch()
    return (

        <TouchableHighlight underlayColor="#DDDDDD" style={{ alignSelf: type == 1 ? 'flex-end' : 'flex-start', 
        borderTopStartRadius: type == 1 ? 10 : 30, borderTopRightRadius: type == 2 ? 10 : 30, 
        borderRadius: 10, borderWidth: 0,
        backgroundColor: type == 1 ? 'tomato' : '#f2f2f2', 
        borderColor: 'black', 'padding': 10, 'margin': 5, 'marginTop': 10 }} onPress={() =>
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
                    <Text style={{ alignSelf: type == 1 ? 'flex-end' : 'flex-start', 
                        color:type == 1 ? 'black' : 'tomato',
                    fontSize: 15, fontWeight: 'bold' }}>{type == 1 ? 'You' : 'Dokternya'}</Text>
                    <Text style={{ color:type == 1 ? 'white' : 'black', fontSize: 14, fontWeight: '300' }}>{text}</Text>
                    <Text style={{ color:type == 1 ? 'white' : 'black', alignSelf: type == 1 ? 'flex-end' : 'flex-start', fontSize: 10, fontWeight: '800'}}>{date}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}



// const addChat=;


const ChatDetailScreen = () =>
{

    [chatState, setChatState] = useState(data);
    [inputChat, setInputChatState] = useState("");


    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <View style={{ display: 'flex', 'flexDirection': 'column', height: '100%', backgroundColor: 'white', justifyContent: 'space-between' }}>
                <FlatListBasics chat={chatState} />
                <View style={{ display: 'flex', backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-between',marginBottom:10 }}>
                    <View
                        style={{
                            elevation:5,
                            borderRadius: 20,
                            padding: 5,
                            flex: 1,
                            backgroundColor: 'white',
                            marginHorizontal:5, 
                            shadowRadius: 3,
                            paddingHorizontal:20, shadowOpacity: 0.5, shadowOffset: { width: 2, height: -1 }, shadowColor: 'black'

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
                                alignSelf:'center' ,
                                maxHeight:40,
                                borderRadius: 20,
                                padding: 5,
                                backgroundColor: 'tomato',
                                marginHorizontal: 10, shadowRadius: 3, shadowOpacity: 0.2, shadowOffset: { width: 2, height: -1 }, shadowColor: 'black'

                            }}

                            onPress={() =>
                            {
                                var today = new Date();
                                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

                                setChatState((state) => [...state, { id: chatState.length + 1, text: inputChat, date: time, type: 1 }]);
                                setInputChatState(()=>'');
                            }}>

                            <Ionicons name="send" color='white' style={{ padding: 10, paddingVertical: 5 }} size={20} />
                            {/* <Button color="white"  title={}/>  */}

                        </TouchableHighlight>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default ChatDetailScreen

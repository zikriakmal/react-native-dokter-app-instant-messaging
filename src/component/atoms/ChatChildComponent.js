import React from 'react'
import { useState } from 'react';
import { View, Text, Image } from 'react-native'
import { RectButton } from 'react-native-gesture-handler';



const ChatChildComponent = ({ navigation, name, lastChat, ...props }) =>
{
    return (
                <View style={{ 'display': 'flex', 'flexDirection': 'row', padding: 20, borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
                    <Image source={require('../../assets/ayodokter.png')} style={{
                        width: 50,
                        height: 50,
                        borderRadius: 150 / 2,
                        overflow: "hidden",
                        borderWidth: 3,
                        borderColor: "tomato"
                    }} />
                    <View style={{ 'display': 'flex', 'flexDirection': 'column', 'paddingHorizontal': 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: '300' }}>{name}</Text>
                        <Text style={{ fontSize: 14, fontWeight: '700', color: "#2e2e2e" }}>{lastChat}</Text>
                        <Text style={{ fontSize: 14, fontWeight: '700', color: "#2e2e2e" }}></Text>
                    </View>
                </View>
    )
}



export default ChatChildComponent

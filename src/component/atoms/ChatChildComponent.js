import React from 'react'
import { useState } from 'react';
import { View, Text, Image } from 'react-native'
import { RectButton } from 'react-native-gesture-handler';



const ChatChildComponent = ({ navigation, name,photoPath, lastChat, ...props }) =>
{
    return (
                <View style={{ 'display': 'flex', 'flexDirection': 'row', padding: 20, borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
                    <Image source={{uri:photoPath}} style={{
                        width: 50,
                        height: 50,
                        borderRadius: 150 / 2,
                        overflow: "hidden",
                        borderWidth: 3,
                        borderColor: "tomato"
                    }} />

                    <View style={{ 'display': 'flex', 'flexDirection': 'column', 'marginHorizontal': 22 }}>
                        <Text style={{ fontSize: 14, fontWeight: '300' }}>{name}</Text>
                        <Text style={{ fontSize: 12, fontWeight: '800', color: "#2e2e2e" }}>{lastChat}</Text>
                    </View>
                </View>
    )
}



export default ChatChildComponent

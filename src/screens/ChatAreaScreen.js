import React from 'react'
import { View, Text,SafeAreaView,ScrollView, TouchableHighlight } from 'react-native'

const ChatAreaScreen = () =>
{
    return (
        <SafeAreaView style={{ 'backgroundColor': 'white', 'height': '100%' }} >
            <ScrollView >
                <View   >
                    <TouchableHighlight underlayColor="#DDDDDD" style={{'padding':20}} onPress={()=>{alert('jang enam')}}>
                        <Text>Dokter subandono</Text>
                    </TouchableHighlight>
                </View>
                <View style={{'margin':20}}>
                    <Text>Dokter subandono</Text>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default ChatAreaScreen

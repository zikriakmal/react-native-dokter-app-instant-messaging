import React from 'react'

import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import { MMKV } from 'react-native-mmkv'
import { Button } from 'react-native-paper'
import { black } from 'react-native-paper/lib/typescript/styles/colors'
import { useDispatch } from 'react-redux'

const ProfileScreen = ({navigation}) =>
{

    const dispatch = useDispatch()
    const storeData = (value) =>
    {
        MMKV.set('isLogin', false)
        dispatch({ type: 'SET_LOGIN' })
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <ScrollView >
                <View style={{ alignContent: 'center', alignItems: 'center', 'margin': 10, 'padding': 50, 'backgroundColor': 'white', shadowRadius: 10, shadowOpacity: 0.4, shadowOffset: { width: 2, height: -1 }, shadowColor: 'black' }} >
                    <Text style={{ textAlign: 'center', 'margin': 20 }}> INI PROFILE SCREEN NYA</Text>
                    <Image source={require('../assets/ayodokter.png')} style={{
                        width: 150,
                        height: 150,
                        borderRadius: 150 / 2,
                        overflow: "hidden",
                        borderWidth: 3,
                        borderColor: "tomato"
                    }} />
                    <View style={{ display: 'flex', 'flexDirection': 'row' }}>
                        <Text style={{ fontSize: 18, fontWeight: '700', 'marginTop': 20, 'color': 'tomato' }} > Angela Fongs </Text>
                        <Text style={{ fontSize: 18, fontWeight: '700', 'marginTop': 20, 'color': 'tomato' }} > | +62 853 6350 278</Text>
                    </View>
                    <View style={{ display: 'flex', 'flexDirection': 'row' }}>
                        <Text style={{ fontSize: 18, fontWeight: '700', 'marginTop': 20, 'color': 'tomato' }} > Angela Fongs</Text>
                        <Text style={{ fontSize: 18, fontWeight: '700', 'marginTop': 20, 'color': 'tomato' }} > Angela Fongs</Text>
                    </View>
                </View>
                <View style={{ alignContent: 'center', 'margin': 10, 'padding': 30, 'backgroundColor': 'white', shadowRadius: 10, shadowOpacity: 0.4, shadowOffset: { width: 2, height: -1 }, shadowColor: 'black' }} >
                    <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: '700', 'marginTop': 20 }}> Data Diri</Text>
                    <Text style={{ fontSize: 14, 'marginTop': 20 }}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus tincidunt erat non blandit. Nullam nec ipsum id erat imperdiet placerat. Integer pellentesque sit amet nibh id egestas. Fusce quis sollicitudin massa. Praesent a quam in velit posuere commodo. Morbi mattis nisi placerat felis suscipit congue. Donec fringilla dolor a tellus auctor, eu maximus eros tempor.
                    </Text>
                    <Button dark={true} style={{ 'paddingVertical': 5, 'marginLeft': 15, 'marginRight': 15, 'marginBottom': 20, 'marginTop': 15 }} mode="contained" onPress={storeData}>
                       Keluar 
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileScreen

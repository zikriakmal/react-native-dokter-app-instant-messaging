import React, { useEffect } from 'react'
import { useState } from 'react'
import
{
    StyleSheet, View, Text, SafeAreaView, Image
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, TextInput } from 'react-native-paper'
import { MMKV } from 'react-native-mmkv';
import { useDispatch, useSelector } from 'react-redux'





const LoginPage = ({ navigation }) =>
{
    const [passwordHide, setPasswordHide] = useState(true)
    //   const backgroundStyle = {
    //     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    //   };
    const dispatch = useDispatch()
    
    const globalState = useSelector(state => state)
    const storeData = (value) =>
    {
        MMKV.set('isLogin', true)
        dispatch({ type: 'SET_LOGIN' })
    }

    useEffect(() =>
    {
        console.log(MMKV.getBoolean('isLogin'))
    })

    return (
        <SafeAreaView style={{ 'backgroundColor': 'white', 'height': '100%' }} >
            <ScrollView >
                <View>
                    <View style={{ 'alignContent': 'center', 'alignItems': 'center' }}>
                        <Text style={{ 'alignContent': 'center', 'fontSize': 20, 'fontWeight': '700', 'margin': 30 }}>Aplikasi Dokter Nugosyah</Text>
                        <Text style={{ 'alignContent': 'center', 'fontSize': 15, 'fontWeight': '700', 'margin': 5 }}>Masuk</Text>
                        <Image source={require('../assets/ayodokter.png')} style={{ 'width': "75%", 'height': 200 }} />
                    </View>
                    <View>
                        <TextInput mode="outlined" theme={{roundness:20}} dense  label="Email" style={{ 'margin': 15,'height':45 }} />
                        <TextInput mode="outlined" theme={{roundness:20}} dense  label="Password" secureTextEntry={passwordHide} style={{ 'margin': 15,'height':45 }} right={<TextInput.Icon name={passwordHide ? "eye" : "eye-off"} onPress={() => { setPasswordHide(!passwordHide) }} />} />
                    </View>
                    <View style={{ 'alignContent': 'center' }}>
                        <Button dark={true} theme={{roundness:20}} style={{ 'paddingVertical': 5, 'marginLeft': 15, 'marginRight': 15, 'marginBottom': 20, 'marginTop': 15,'height':45 }} mode="contained" onPress={storeData}>
                            Masuk
                        </Button>
                        <Text onPress={() => { navigation.navigate('Register') }} style={{ 'marginTop': 10, 'textAlign': 'center', 'textDecorationLine': 'underline', 'fontSize': 14, 'color': 'red' }}>
                            Daftar Disini
                        </Text>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});



export default LoginPage

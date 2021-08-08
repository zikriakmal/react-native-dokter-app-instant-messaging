import React, { useEffect } from 'react'
import { useState } from 'react'
import
{
    StyleSheet, View, Text, SafeAreaView, Image, KeyboardAvoidingView
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, TextInput } from 'react-native-paper'
import { MMKV } from 'react-native-mmkv';
import { useDispatch, useSelector } from 'react-redux'
import Auth from '../services/auth.service'





const LoginPage = ({ navigation }) =>
{
    const [passwordHide, setPasswordHide] = useState(true)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch()
    const globalState = useSelector(state => state)

    const storeData = () =>
    {
        Auth(email, password).then((data) =>
        {

            if (data.data.status == "success") {
                MMKV.set('isLogin', true)
                MMKV.set('access_token',data.data.data.access_token)
                MMKV.set('userId','userId1')
                MMKV.set('type',1)
                dispatch({type:'SET_LOGIN',token:data.data.data.access_token})
                return 0;
            }
            alert("login gagal");
        });

    }


    return (
        <SafeAreaView style={{ 'backgroundColor': 'white', 'height': '100%' }} >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}>
                <ScrollView >
                    <View>
                        <View style={{ 'alignContent': 'center', 'alignItems': 'center' }}>
                            <Text style={{ 'alignContent': 'center', 'fontSize': 20, 'fontWeight': '700', 'margin': 30 }}>Aplikasi Dokter Nugosyah</Text>
                            <Text style={{ 'alignContent': 'center', 'fontSize': 15, 'fontWeight': '700', 'margin': 5 }}>Masuk</Text>
                            <Image source={require('../assets/ayodokter.png')} style={{ 'width': "75%", 'height': 200 }} />
                        </View>
                        <View>
                            <TextInput mode="outlined" theme={{ roundness: 20 }} dense label="Email" style={{ 'margin': 15, 'height': 45 }} onChangeText={(data) => { setEmail(data) }} />
                            <TextInput mode="outlined" theme={{ roundness: 20 }} dense label="Password"
                                onChangeText={(data) => { setPassword(data) }}
                                secureTextEntry={passwordHide} style={{ 'margin': 15, 'height': 45 }} right={<TextInput.Icon
                                    name={passwordHide ? "eye" : "eye-off"} onPress={() => { setPasswordHide(!passwordHide) }} />} />
                        </View>
                        <View style={{ 'alignContent': 'center' }}>
                            <Button dark={true} theme={{ roundness: 20 }} contentStyle={{ height: 45 }} style={{ 'marginLeft': 15, 'marginRight': 15 }} mode="contained" onPress={storeData}>
                                Masuk
                            </Button>
                            <Text onPress={() => { navigation.navigate('Register') }} style={{ 'marginVertical': 10, 'textAlign': 'center', 'textDecorationLine': 'underline', 'fontSize': 14, 'color': 'red' }}>
                                Daftar Disini
                            </Text>
                        </View>
                    </View>
                </ScrollView>

            </KeyboardAvoidingView>
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

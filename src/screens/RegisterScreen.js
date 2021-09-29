import React from 'react'
import { useState } from 'react'
import
{
    StyleSheet, View, Text, SafeAreaView, Image, KeyboardAvoidingView
} from 'react-native'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { TextInput } from 'react-native-paper'
import GlobalButton from '../component/atoms/GlobalButton'
import { Register } from '../services/auth.service'
import { MMKV } from 'react-native-mmkv'
import { useDispatch } from 'react-redux'

const RegisterScreen = ({ navigation }) =>
{
    const [passwordHide, setPasswordHide] = useState(true)
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch()



    const storeData = () =>
    {
        setIsLoading(true);
        Register(username, phoneNumber, email, password).then((data) =>
        {
            console.log(data.data);
            if (data.data.status == "success") {
                MMKV.set('isLogin', true)
                MMKV.set('access_token', data.data.data.access_token)
                MMKV.set('type', data.data.data.member_type)
                MMKV.set('userId', data.data.data.firebase_id)
                setIsLoading(false)
                dispatch({ type: 'SET_LOGIN', token: data.data.data.access_token })
                return 0;
            }

            setIsLoading(false)
            alert("Registrasi Gagal, Email sudah digunakan");
        });

    }

    return (
        <SafeAreaView style={{ 'backgroundColor': 'white', 'height': '100%' }} >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ height: '100%' }}>
                <ScrollView >
                    <View style={{ marginHorizontal: 40 }}>
                        <View style={{ 'alignContent': 'center', 'alignItems': 'center' }}>
                            <Text style={{ 'alignContent': 'center', 'fontSize': 20, 'fontWeight': 'bold', 'margin': 5, marginTop: 30 }}>MESH-Teen </Text>
                            <Text style={{ 'alignContent': 'center', 'fontSize': 15, 'fontWeight': '100', 'margin': 1 }}>(Menstruation Hygiene for Teen)</Text>
                            <Text style={{ 'alignContent': 'center', 'fontSize': 15, 'fontWeight': '700', 'margin': 10 }}>Registrasi</Text>
                            <Image source={require('../assets/ayodokter.png')} style={{ 'width': "100%", 'height': 200 }} />
                        </View>
                        <View>
                            <TextInput theme={{ roundness: 15 }} onChangeText={(data) => setUsername(data)} dense mode="outlined" label="Nama Lengkap" style={{ 'marginTop': 10 }} />
                            <TextInput theme={{ roundness: 15 }} onChangeText={(data) => setPhoneNumber(data)} dense mode="outlined" label="Nomor Telfon" style={{ 'marginTop': 10 }} />
                            <TextInput theme={{ roundness: 15 }} onChangeText={(data) => setEmail(data)} dense mode="outlined" label="Email" style={{ 'marginTop': 10 }} />
                            <TextInput mode="outlined" theme={{ roundness: 15 }} dense label="Password"
                                onChangeText={(data) => { setPassword(data) }}
                                secureTextEntry={passwordHide} style={{ 'marginTop': 10 }} right={<TextInput.Icon
                                    name={passwordHide ? "eye" : "eye-off"} onPress={() => { setPasswordHide(!passwordHide) }} />} />
                        </View>
                        <View style={{ 'alignContent': 'center', marginBottom: 20 }}>
                            <GlobalButton onPress={storeData} title={isLoading ? 'Mohon menunggu...' : 'Daftar'} disabled={isLoading || (
                                username == '' || phoneNumber == '' || email == '' || password == ''
                            )} style={{ 'marginTop': 20 }} />
                            <RectButton onPress={() => { navigation.navigate('Login') }} >
                                <Text  style={{ paddingVertical:20, 'textAlign': 'center', 'textDecorationLine': 'underline', 'fontSize': 14, 'color': 'tomato' }}>
                                    Sudah daftar? Login Disini
                                </Text>
                            </RectButton>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterScreen

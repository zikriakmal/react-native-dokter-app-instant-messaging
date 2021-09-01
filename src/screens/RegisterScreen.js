import React from 'react'
import { useState } from 'react'
import
{
    StyleSheet, View, Text, SafeAreaView, Image,KeyboardAvoidingView
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
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
                    <View>
                        <View style={{ 'alignContent': 'center', 'alignItems': 'center' }}>
                            <Text style={{ 'alignContent': 'center', 'fontSize': 20, 'fontWeight': '700', 'margin': 30 }}>Ayo Dokter</Text>
                            <Text style={{ 'alignContent': 'center', 'fontSize': 15, 'fontWeight': '700', 'margin': 5 }}>Registrasi</Text>
                            <Image source={require('../assets/ayodokter.png')} style={{ 'width': "75%", 'height': 200 }} />
                        </View>
                        <View>
                            <TextInput theme={{ roundness: 20 }} onChangeText={(data) => setUsername(data)} mode="outlined" label="Nama Lengkap" style={{ 'margin': 15, marginVertical: 10, 'height': 45 }} />
                            <TextInput theme={{ roundness: 20 }} onChangeText={(data) => setPhoneNumber(data)} mode="outlined" label="Nomor Telfon" style={{ 'margin': 15, marginVertical: 10, 'height': 45 }} />
                            <TextInput theme={{ roundness: 20 }} onChangeText={(data) => setEmail(data)} mode="outlined" label="Email" style={{ 'margin': 15, marginVertical: 10, 'height': 45 }} />
                            <TextInput mode="outlined" theme={{ roundness: 20 }} dense label="Password"
                                onChangeText={(data) => { setPassword(data) }}
                                secureTextEntry={passwordHide} style={{ 'margin': 15, 'height': 45 }} right={<TextInput.Icon
                                    name={passwordHide ? "eye" : "eye-off"} onPress={() => { setPasswordHide(!passwordHide) }} />} />
                        </View>
                        <View style={{ 'alignContent': 'center' }}>
                            <GlobalButton onPress={storeData} title={isLoading ? 'Mohon menunggu...' : 'Daftar'} disabled={isLoading} style={{ 'margin': 10 }} />
                            <Text onPress={() => { navigation.navigate('Login') }} style={{ 'marginTop': 10, 'textAlign': 'center', 'textDecorationLine': 'underline', 'fontSize': 14, 'color': 'red' }}>
                                Sudah daftar? Login Disini
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterScreen

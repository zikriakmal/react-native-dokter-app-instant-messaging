import React from 'react'
import { useState } from 'react'
import
{
    StyleSheet, View, Text, SafeAreaView, Image, KeyboardAvoidingView
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
                            <Text style={{ 'alignContent': 'center', 'fontSize': 20, 'fontWeight': 'bold', 'margin': 5, marginTop: 30 }}>MESH-Teen </Text>
                            <Text style={{ 'alignContent': 'center', 'fontSize': 20, 'fontWeight': '100', 'margin': 1 }}>(Menstruation Hygiene for Teen)</Text>
                            <Text style={{ 'alignContent': 'center', 'fontSize': 20, 'fontWeight': '100', 'margin': 1 }}>Registrasi</Text>
                            <Image source={require('../assets/ayodokter.png')} style={{ 'width': "75%", 'height': 200 }} />
                        </View>
                        <View>
                            <TextInput theme={{ roundness: 20 }} onChangeText={(data) => setUsername(data)} dense mode="outlined" label="Nama Lengkap" style={{ 'margin': 8, marginHorizontal: 20 }} />
                            <TextInput theme={{ roundness: 20 }} onChangeText={(data) => setPhoneNumber(data)} dense mode="outlined" label="Nomor Telfon" style={{ 'margin': 8, marginHorizontal: 20 }} />
                            <TextInput theme={{ roundness: 20 }} onChangeText={(data) => setEmail(data)} dense mode="outlined" label="Email" style={{ 'margin': 8, marginHorizontal: 20 }} />
                            <TextInput mode="outlined" theme={{ roundness: 20 }} dense label="Password"
                                onChangeText={(data) => { setPassword(data) }}
                                secureTextEntry={passwordHide} style={{ 'margin': 10, marginHorizontal: 20 }} right={<TextInput.Icon
                                    name={passwordHide ? "eye" : "eye-off"} onPress={() => { setPasswordHide(!passwordHide) }} />} />
                        </View>
                        <View style={{ 'alignContent': 'center',marginBottom:20 }}>
                            <GlobalButton onPress={storeData} title={isLoading ? 'Mohon menunggu...' : 'Daftar'} disabled={isLoading || (
                                username == '' || phoneNumber =='' || email == '' || password == ''
                            )} style={{ 'margin': 10 }} />
                            <Text onPress={() => { navigation.navigate('Login') }} style={{ 'marginTop': 8, 'textAlign': 'center', 'textDecorationLine': 'underline', 'fontSize': 14, 'color': 'red' }}>
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

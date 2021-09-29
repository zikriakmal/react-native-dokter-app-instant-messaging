import React, { useEffect } from 'react'
import { useState } from 'react'
import
{
    StyleSheet, View, Text, SafeAreaView, Image, KeyboardAvoidingView, Alert
} from 'react-native'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { Button, TextInput } from 'react-native-paper'
import { MMKV } from 'react-native-mmkv';
import { useDispatch } from 'react-redux'
import { Auth } from '../services/auth.service'


const LoginPage = ({ navigation }) =>
{
    const [passwordHide, setPasswordHide] = useState(true)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch()

    const storeData = () =>
    {
        setIsLoading(true);
        Auth(email, password).then((data) =>
        {
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
            Alert.alert('Login', "Email Atau Password Salah");
        });

    }


    return (
        <SafeAreaView style={{ 'backgroundColor': 'white', 'height': '100%' }} >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ height: '100%' }}
            >
                <ScrollView >
                    <View style={{ marginHorizontal: 40 }}>
                        <View style={{ 'alignContent': 'center', 'alignItems': 'center' }}>
                            <Text style={{ 'alignContent': 'center', 'fontSize': 20, 'fontWeight': 'bold', 'margin': 5, marginTop: 30 }}>MESH-Teen </Text>
                            <Text style={{ 'alignContent': 'center', 'fontSize': 15, 'fontWeight': '100', 'margin': 1 }}>(Menstruation Hygiene for Teen)</Text>
                            <Text style={{ 'alignContent': 'center', 'fontSize': 15, 'fontWeight': '700', 'margin': 10 }}>Masuk</Text>
                            <Image source={require('../assets/ayodokter.png')} style={{ 'width': "100%", 'height': 200 }} />
                        </View>
                        <View>
                            <TextInput mode="outlined" theme={{ roundness: 15 }} dense label="Email" style={{ 'marginVertical': 10 }} onChangeText={(data) => { setEmail(data) }} />
                            <TextInput mode="outlined" theme={{ roundness: 15 }} dense label="Password"
                                onChangeText={(data) => { setPassword(data) }}
                                secureTextEntry={passwordHide} style={{ 'marginVertical': 5 }} right={<TextInput.Icon
                                    name={passwordHide ? "eye" : "eye-off"} onPress={() => { setPasswordHide(!passwordHide) }} />} />
                        </View>
                        <View style={{ 'alignContent': 'center' }}>
                            <Button dark={true}
                                disabled={isLoading || (email == '' || password == '')}
                                theme={{ roundness: 15 }} contentStyle={{ height: 45 }}
                                style={{ marginVertical: 20 }} mode="contained" onPress={storeData}>
                                {isLoading ? "Loading..." : "Masuk"}
                            </Button>
                            <RectButton  onPress={() => { navigation.navigate('Register') }}  >
                                <Text style={{ paddingVertical: 20, 'textAlign': 'center', 'textDecorationLine': 'underline', 'fontSize': 14, 'color': 'tomato' }}>
                                    Daftar Disini
                                </Text>
                            </RectButton>
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

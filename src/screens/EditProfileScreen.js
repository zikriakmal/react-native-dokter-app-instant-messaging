import React, { useState } from 'react'
import { View, Text, Image, SafeAreaView, KeyboardAvoidingView, ScrollView } from 'react-native'
import { MMKV } from 'react-native-mmkv'
import { Button, TextInput } from 'react-native-paper'
import GlobalButton from '../component/atoms/GlobalButton'
import * as ImagePicker from "react-native-image-picker"
import { updateProfileInfo } from '../services/user.service'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const EditProfileScreen = () =>
{

    const [passwordHide, setPasswordHide] = useState(true)
    const [username, setUsername] = useState(MMKV.getString('username'));
    const [phoneNumber, setPhoneNumber] = useState(MMKV.getString('phoneNumber'));
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch()

    const selector = useSelector(state=>state)

    const [filePath, setFilePath] = useState(MMKV.getString('photoProfile'));
    const myfun = () =>
    {
        //alert('clicked');
        ImagePicker.launchImageLibrary(options, (response) =>
        {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                setFilePath(source);
            }
        });
    };
    return (
        <SafeAreaView style={{ 'backgroundColor': 'white', 'height': '100%' }} >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ height: '100%' }}>
                <ScrollView >
                    <View style={{marginHorizontal:15}}>
                        <Image source={{ uri: filePath }}
                            style={{
                                width: 150,
                                height: 150,
                                borderRadius: 150 / 2,
                                overflow: "hidden",
                                borderWidth: 3,
                                borderColor: "tomato",
                                alignSelf: 'center'
                            }} />
                        <View>
                            <View style={{ paddingHorizontal: 100, marginTop: 10 }}>
                                <GlobalButton onPress={() =>
                                    ImagePicker.launchImageLibrary(
                                        {
                                            mediaType: 'photo',
                                            includeBase64: false,
                                            maxHeight: 200,
                                            maxWidth: 200,
                                        },
                                        (response) =>
                                        {
                                            if(!response.didCancel) setFilePath(response.assets[0].uri);
                                        },
                                    )
                                } title="Ubah Foto" />
                            </View>
                            <TextInput theme={{ roundness: 15 }} value={username} 
                            onChangeText={(data) => setUsername(data)} dense mode="outlined" label="Nama Lengkap" style={{ fontSize:14,'margin': 10, marginHorizontal: 20 }} />
                            <TextInput theme={{ roundness: 15 }} value={phoneNumber} 
                            onChangeText={(data) => setPhoneNumber(data)} dense mode="outlined" 
                            label="Nomor Telfon" style={{fontSize:14, 'margin': 10, marginHorizontal: 20 }} />
                            <TextInput mode="outlined" theme={{ roundness: 15 }} dense label="Password"
                                onChangeText={(data) => { setPassword(data) }}
                                secureTextEntry={passwordHide} style={{fontSize:14, 'margin': 10, marginHorizontal: 20 }} right={<TextInput.Icon
                                    name={passwordHide ? "eye" : "eye-off"} onPress={() => { setPasswordHide(!passwordHide) }} />} />
                        </View>
                        <View style={{ 'alignContent': 'center' }}>
                            <GlobalButton onPress={() =>
                            {
                                setIsLoading(true)
                                updateProfileInfo({ filePath: filePath, username: username, phoneNumber: phoneNumber, password: password }).then((resp) =>
                                {
                                    MMKV.set('username', resp.data.data.username);
                                    MMKV.set('photoProfile', resp.data.data.photo_path);
                                    MMKV.set('phoneNumber', resp.data.data.phone_number)

                                    dispatch({
                                        type: 'SET_USER',
                                        username: resp.data.data.username,
                                    })
                                    setIsLoading(false)
                                })
                            }} title={isLoading ? 'Mohon menunggu...' : 'Ubah'} disabled={isLoading} style={{ 'margin': 10 }} />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default EditProfileScreen

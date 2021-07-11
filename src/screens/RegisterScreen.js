import React from 'react'
import
    {
        StyleSheet, View, Text, SafeAreaView, Image
    } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, TextInput } from 'react-native-paper'


const RegisterScreen = ({navigation}) => {
    return (
        <View>
         <SafeAreaView style={{ 'backgroundColor': 'white', 'height': '100%' }} >
            <ScrollView >
                <View>
                    <View style={{ 'alignContent': 'center', 'alignItems': 'center' }}>
                        <Text style={{ 'alignContent': 'center', 'fontSize': 20, 'fontWeight': '700', 'margin': 30 }}>Aplikasi Dokter Nugosyah</Text>
                        <Text style={{ 'alignContent': 'center', 'fontSize': 15, 'fontWeight': '700', 'margin': 5 }}>Registrasi</Text>
                        <Image source={require('../assets/ayodokter.png')} style={{ 'width': "75%", 'height': 200 }} />
                    </View>
                    <View>
                        <TextInput mode="outlined" label="Username" style={{ 'margin': 15 }} />
                        <TextInput mode="outlined" label="Email" style={{ 'margin': 15 }} />
                        <TextInput mode="outlined" label="Password" style={{ 'margin': 15 }} />
                    </View>
                    <View style={{'alignContent':'center'}}>
                        <Button dark={true} style={{ 'paddingVertical': 5, 'marginLeft': 15, 'marginRight': 15, 'marginBottom': 20, 'marginTop': 15 }} mode="contained" onPress={() => console.log('Pressed')}>
                           Daftar 
                        </Button>
                        <Text onPress={()=>{navigation.navigate('Login')}} style={{ 'marginTop': 10,'textAlign':'center', 'textDecorationLine': 'underline', 'fontSize': 14, 'color': 'red' }}>
                          Sudah daftar? Login Disini 
                        </Text>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
      </View>
    )
}

export default RegisterScreen

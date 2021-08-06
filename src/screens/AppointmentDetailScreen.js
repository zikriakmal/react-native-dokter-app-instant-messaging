import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Avatar, Button } from 'react-native-paper'
import GlobalButton from '../component/atoms/GlobalButton'



const HeaderContent = () =>
{
    return (
        <View style={style.header} >
            <View style={{ 'backgroundColor': 'white', flex: 1 }}>
                <Avatar.Image style={{ alignItems: 'center' }} source={require('../assets/ayodokter.png')} />
            </View>
            <View style={{ 'backgroundColor': 'white', flex: 3 }}>
                <Text>Dr. Leonita Katarina Sihotang, Sp.KFR</Text>
                <Text>Dokter Rehabilitasi Medis</Text>
                <Text>12 Pasieen</Text>
            </View>
        </View>
    )
}


const BodyContent = ({navigation}) =>
{
    return (
        <View style={{margin:30}}>
            <View style={{
                 padding: 10, shadowColor: '#000000',
                backgroundColor: 'white', 'shadowOffset': { 'height': 2 },
                'shadowRadius': 9, 'shadowOpacity': 0.3, 'borderRadius': 10
            }}>
                <Text>Lokasi & Jadwal Peraktek</Text>
                <View style={{ display: 'flex', flexDirection: 'row', margin: 10 }}>
                    <View>
                        <Avatar.Image style={{ alignItems: 'center' }} source={require('../assets/ayodokter.png')} />
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text>Rumah Sakit Advent Medan</Text>
                        <Text>Rumah Sakit Advent Medan</Text>
                        <Text>Rumah Sakit Advent Medan</Text>
                        <Text>Rumah Sakit Advent Medan</Text>
                    </View>
                </View>
                <View style={{ marginVertical: 10, padding: 3, borderWidth: 0.4, borderRadius: 5, borderColor: 'grey' }}>
                    <Text style={{ padding: 3 }}> Rabu, 28 Juli 2021</Text>
                    <Button mode="outlined" onPress={() => alert('hai')} style={{ width: '50%', margin: 3 }} > 18:00 - 21:00</Button>
                </View>
                <View style={{ marginVertical: 10, padding: 3, borderWidth: 0.4, borderRadius: 5, borderColor: 'grey' }}>
                    <Text style={{ padding: 3 }}> Senin, 25 Juli 2021</Text>
                    <Button mode="outlined" onPress={() => alert('hai')} style={{ width: '50%', margin: 3 }} > 18:00 - 21:00</Button>
                </View>
            </View>
            <View style={{ marginVertical: 25, padding: 10, shadowColor: '#000000',
                backgroundColor: 'white', 'shadowOffset': { 'height': 2 },
                'shadowRadius': 9, 'shadowOpacity': 0.3, 'borderRadius': 10
            }}>
                <Text style={{ paddingVertical: 10 }}>Profil Dokter</Text>
                <Text style={{ paddingVertical: 10 }}>
                    Lorem ipsumsssssssssssssssssssss
                    sssssssssssssssssssssss
                    sssssssssssssssssssssssssssssssssss
                </Text>
            </View>
            <GlobalButton title={'Buat Janji'} onPress={()=>{navigation.navigate('ChatDetail', { name: name,id:id  });}}  />
        </View>
    )
}

const AppointmentDetailScreen = ({ route, navigation }) =>
{
    return (
        <View>
            <HeaderContent />
            <BodyContent navigation={navigation} />
            {/* <Text>{route.params.name}</Text> */}
        </View>
    )
}

const style = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'flex-start',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey',
    }

})

export default AppointmentDetailScreen

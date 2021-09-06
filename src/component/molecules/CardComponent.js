import React from 'react'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-paper'

const CardComponent = () =>
{
    return (
        <View elevation={10} style={{ marginVertical:5, marginHorizontal:10, padding: 15, backgroundColor:'white',borderRadius: 20, shadowRadius: 5, shadowOpacity: 0.4, shadowOffset: { width: 2, height: -1 }, shadowColor: 'black' }}>
            <View style={{ display: 'flex', flexDirection: 'row',marginVertical:10 }}>
                <View>
                    <Avatar.Image source={{url:'https://backoffice.dokterapp.zikri.my.id/storage/doctors/profile-image/358655.jpeg'}}  />
                </View>
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Dr.Fong</Text>
                    <Text style={{ fontSize: 12 }}>Dibuat pada 27 januari 2021 </Text>
                </View>
            </View>
            <Text style={{ fontSize: 17 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
            <Text onPress={(data) => { alert('tes') }} style={{ fontSize: 12, textAlign: 'right' }}>baca lebih detail</Text>
        </View>
    )
}

export default CardComponent

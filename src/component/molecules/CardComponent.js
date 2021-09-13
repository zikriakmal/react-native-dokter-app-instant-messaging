import React, { useState } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Avatar, Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import Modal from "react-native-modal";
import { MMKV } from 'react-native-mmkv';
import GlobalButton from '../atoms/GlobalButton';
const CardComponent = ({ photoPath, data }) =>
{
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View elevation={10} style={{ marginVertical: 5, marginHorizontal: 10, padding: 15, backgroundColor: 'white', borderRadius: 20, shadowRadius: 5, shadowOpacity: 0.4, shadowOffset: { width: 2, height: -1 }, shadowColor: 'black' }}>
            <Modal isVisible={modalVisible} animationIn={'slideInUp'}
                animationOutTiming={10}
                style={{ padding: 20 }}
                onBackdropPress={() => { setModalVisible(false) }} >

                <View style={{ alignSelf: 'flex-end', 'maxWidth': '25%', marginVertical: 10 }}>
                    <GlobalButton onPress={() => { setModalVisible(false) }} title={'X'} />
                </View>
                <ScrollView style={{ maxHeight: '50%' }}>

                    <View style={{ zIndex: 0, padding: 20, width: '100%', borderRadius: 20, backgroundColor: 'white', alignSelf: 'center' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Pertanyaan </Text>
                        <Text>{data.question}</Text>
                    </View>
                    {data.is_answered ?
                        <View style={{ zIndex: 99999, padding: 20, width: '100%', marginTop: 20, borderRadius: 20, backgroundColor: 'white', alignSelf: 'center' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Jawaban</Text>
                            <Text style={{ fontSize: 10, fontWeight: 'bold' }}>Dijawab oleh : {data.doctor.username}</Text>
                            <Text>{data.answer} </Text>
                        </View>
                        : null}

                </ScrollView>
            </Modal>
            <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10 }}>
                <View>
                    <Avatar.Image source={{ uri: photoPath }} />
                </View>
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Dr.Fong</Text>
                    <Text style={{ fontSize: 12 }}>Dibuat pada 27 januari 2021 </Text>
                </View>
            </View>
            <Text style={{ fontSize: 17 }} numberOfLines={4}>{data.question}.</Text>
            <View style={{ display: 'flex', flexDirection: 'row', 'justifyContent': 'space-between' }}>
                <Text onPress={(data) => { setModalVisible(true) }} style={{
                    backgroundColor: data.is_answered ? 'green' : 'tomato',
                    alignSelf: 'center',
                    color: data.is_answered ? 'white' : 'white', borderRadius: 30, fontSize: 12, textAlign: 'left', marginTop: 15, paddingHorizontal: 20, paddingVertical: 3
                }}>
                    {data.is_answered ? 'Telah Dijawab' : 'Belum Dijawab'}
                </Text>
                <Text onPress={(data) => { setModalVisible(true) }} style={{ fontSize: 12, textAlign: 'right', marginTop: 15, paddingVertical: 10 }}>Baca Lebih Detail</Text>
            </View>
        </View>
    )
}

export default CardComponent

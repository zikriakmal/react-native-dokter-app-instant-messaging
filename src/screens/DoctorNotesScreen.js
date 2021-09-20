import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, FlatList, Image } from 'react-native'
import GlobalButton from '../component/atoms/GlobalButton'
import { getPostedQuestionNotes } from '../services/doctorNotes.service'
import dateFormat from 'dateformat';

import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)


const DoctorNotesScreen = ({ navigation }) =>
{
    const dummyData = [{ key: 1, data: null }, { key: 2, data: null }]
    const [isFetched, setIsFetched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [postedData, setPostedData] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    useEffect(() =>
    {
        if (!isFetched) {
            getPostedQuestionNotes().then((data) =>
            {
                setPostedData(data.data.data)
                const datanya = data.data.data;
                setIsFetched(true);

                if (datanya.length == 0) {
                    setIsEmpty(true)
                } else {
                    setIsEmpty(false)
                }
            })

        }

        const willFocusSubscription = navigation.addListener('focus', () =>
        {
            getPostedQuestionNotes().then((data) =>
            {
                setPostedData(data.data.data)
                const datanya = data.data.data;
                setIsFetched(true);

                if (datanya.length == 0) {
                    setIsEmpty(true)
                } else {
                    setIsEmpty(false)
                }
            })
        });
    })


    return (
        <SafeAreaView>
            <View style={{ paddingHorizontal: 20, paddingTop: 10, paddingBottom: 5 }}>
                <GlobalButton title="Request Catatan" onPress={() => { navigation.navigate("DoctorNotesQuesionerScreen") }} />
                <Text style={{ marginTop: 20, fontSize: 15, fontWeight: 'bold' }}> Daftar pengajuan catatan</Text>
            </View>
            {isEmpty ?
                <View style={{ marginVertical: 50, height: "50%" }}>
                    <Image source={require('../assets/nodata.png')} style={{ 'width': "75%", alignSelf: 'center', 'height': 200 }} />
                    <Text style={{ color: 'tomato', fontWeight: 'bold', alignSelf: 'center' }}>Belum ada pengajuan catatan</Text>
                    <Text style={{ color: 'tomato', fontWeight: 'bold', alignSelf: 'center' }}>Ayo mulai ajukan!</Text>
                </View> :
                <FlatList
                    style={{ marginHorizontal: 10, height: "85%" }}
                    onEndReachedThreshold={0.01}
                    nestedScrollEnabled={true}
                    data={!isFetched ? dummyData : postedData}
                    refreshing={isLoading}
                    onRefresh={() =>
                    {
                        setIsLoading(true)
                        getPostedQuestionNotes().then((data) =>
                        {
                            setPostedData(data.data.data)
                            setIsLoading(false)
                        })
                    }}
                    renderItem={({ item }) =>
                    {
                        return (
                            isFetched ?
                                <View underlayColor="#DDDDDD" onPress={() => alert('Future Feature, Coming soon')}>
                                    <View style={{ padding: 20, marginVertical: 5, marginHorizontal: 10, elevation: 5, borderRadius: 20, backgroundColor: 'white' }}>
                                        <Text style={{ marginVertical: 5, color: 'orange', fontSize: 14 }}>Pengajuan catatan pada:</Text>
                                        <Text style={{ fontSize: 10 }}>{dateFormat(item.created_at, "dd/mm/yyyy, H:MM")}</Text>
                                        <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row-reverse' }}>
                                            <Text style={{ borderRadius: 20, backgroundColor: (item.is_answered ? 'green' : 'tomato'), color: 'white', paddingVertical: 5, fontSize: 10, padding: 3, paddingHorizontal: 10, textAlign: 'center' }}>
                                                {item.is_answered ? 'Sudah Direspon' : 'Belum Direspon'}</Text>
                                        </View>
                                    </View>
                                </View> :
                                <View underlayColor="#DDDDDD" >
                                    <View style={{ padding: 20, marginVertical: 5, marginHorizontal: 10, elevation: 5, borderRadius: 20, backgroundColor: 'white' }}>
                                        <ShimmerPlaceHolder style={{ marginVertical: 5, color: 'orange', borderRadius: 30 }} />
                                        <ShimmerPlaceHolder style={{ width: "25%", borderRadius: 30 }} />
                                        <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row-reverse' }}>
                                            <ShimmerPlaceHolder style={{ width: 100, borderRadius: 20 }} />
                                        </View>
                                    </View>
                                </View>
                        )
                    }

                    }
                />

            }

        </SafeAreaView>
    )
}

export default DoctorNotesScreen

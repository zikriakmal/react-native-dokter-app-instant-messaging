import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, FlatList, TouchableHighlight, RefreshControl } from 'react-native'
import GlobalButton from '../component/atoms/GlobalButton'
import { getPostedQuestionNotes } from '../services/doctorNotes.service'
import dateFormat from 'dateformat';

import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)


const DoctorNotesScreen = ({ navigation }) =>
{
    const dummyData = [{key:1,data:null},{key:2,data:null}]
    const [isFetched, setIsFetched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [postedData, setPostedData] = useState([]);
    useEffect(() =>
    {
        if (!isFetched) {
            getPostedQuestionNotes().then((data) =>
            {
                setPostedData(data.data.data)
            })
            setIsFetched(true);
        }
    })


    return (
        <SafeAreaView>
            <View style={{ padding: 20 }}><GlobalButton title="Jawab pertanyaan" onPress={() => { navigation.navigate("DoctorNotesQuesionerScreen") }} /></View>
            <FlatList
                style={{ marginHorizontal: 10, height: "85%" }}
                onEndReachedThreshold={0.01}
                nestedScrollEnabled={true}
                data={!isFetched ? dummyData: postedData}
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
                    isFetched ?
                    <TouchableHighlight underlayColor="#DDDDDD"  onPress={() => alert('Future Feature, Coming soon')}>
                        <View style={{ padding: 20, margin: 10,elevation:5, borderRadius: 20 ,backgroundColor:'white'}}>
                            <Text style={{ marginVertical: 5, color: 'orange' }}>Pengajuan catatan pada:</Text>
                            <Text>{dateFormat(item.created_at, "dd/mm/yyyy, H:MM")}</Text>
                            <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row-reverse' }}>
                                <Text style={{ borderRadius: 20, backgroundColor: (item.is_answered ? 'green' : 'tomato'), color: 'white', width: 80, fontSize: 10, padding: 3, paddingHorizontal: 10, textAlign: 'center' }}>
                                    {item.is_answered ? 'Sudah Direspon' : 'Belum Direspon'}</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    : 
                    <View underlayColor="#DDDDDD" >
                        <View style={{ padding: 20, margin: 10,elevation:5, borderRadius: 20 ,backgroundColor:'white'}}>
                            <ShimmerPlaceHolder style={{ marginVertical: 5, color: 'orange',borderRadius:30 }}/>
                            <ShimmerPlaceHolder style={{width:"25%",borderRadius:30}}/>
                            <View style={{ marginTop: 10 ,display: 'flex', flexDirection: 'row-reverse' }}>
                                <ShimmerPlaceHolder style={{ width:100,borderRadius: 20}}/>
                            </View>
                        </View>
                    </View>
                }
            />
            <FlatList />
        </SafeAreaView>
    )
}

export default DoctorNotesScreen

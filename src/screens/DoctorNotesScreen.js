import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, FlatList, TouchableHighlight, RefreshControl } from 'react-native'
import GlobalButton from '../component/atoms/GlobalButton'
import { getPostedQuestionNotes } from '../services/doctorNotes.service'
import dateFormat from 'dateformat';

const DoctorNotesScreen = ({ navigation }) =>
{

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
                data={postedData}
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
                }
            />
            <FlatList />
        </SafeAreaView>
    )
}

export default DoctorNotesScreen

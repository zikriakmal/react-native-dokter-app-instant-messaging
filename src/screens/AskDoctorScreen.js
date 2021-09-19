import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, FlatList, Button, Image, RefreshControl } from 'react-native'
import { MMKV } from 'react-native-mmkv'
import { Checkbox, TextInput } from 'react-native-paper'
import GlobalButton from '../component/atoms/GlobalButton'
import CardComponent from '../component/molecules/CardComponent'
import { getSelfQuestion, postAskQuestion } from '../services/askDoctor.service'

const AskDoctorScreen = () =>
{


    const [question, setQuestion] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingList, setIsLoadingList] = useState(false);
    const [isPublish, setIsPublish] = useState(false);

    const [isFetched, setIsFetched] = useState(false);
    const [selfQuestionData, setSelfQuestionData] = useState([]);

    const [noData, setNoData] = useState(false);

    const dummyData = [
        { key: 1, photoPath: null, data: null, isFetched: false },
        { key: 2, photoPath: null, data: null, isFetched: false }
    ]

    useEffect(() =>
    {
        if (!isFetched) {
            getSelfQuestion().then((data) =>
            {

                setSelfQuestionData(data.data.data);
                if (data.data.data.length == 0) {
                    setNoData(true)
                } else {
                    setNoData(false)
                }
                setIsFetched(true);
            })
        }
    })

    return (
        <SafeAreaView>
            <View style={{ padding: 10, display: 'flex', height: '100%' }}>

                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 14 }}>Kamu bisa tanyakan pertanyaan seputar MESH</Text>
                    <TextInput
                        multiline
                        mode="outlined"
                        value={question}
                        numberOfLines={3}
                        style={{ marginVertical: 10 }}
                        onChangeText={(data) => setQuestion(data)}
                    >
                    </TextInput>
                    <View style={{ display: 'flex', flexDirection: 'row', marginHorizontal: -6 }}>
                        <Checkbox
                            status={isPublish ? 'checked' : 'unchecked'}
                            color={'#ff6437'}
                            onPress={() =>
                            {
                                setIsPublish(!isPublish);
                            }} />
                        <Text style={{ fontSize: 12, alignSelf: 'center', fontWeight: '800' }}>Publikasikan </Text>
                    </View>
                </View>


                <View style={{ margin: 2, marginHorizontal: 20 }}>
                    <GlobalButton disabled={question == ""} title={isLoading ? "Loading..." : "Kirim Pertanyaan"} disabled={isLoading ? true : false} onPress={() =>
                    {
                        setIsLoading(true);
                        postAskQuestion(question, 1).then((data) =>
                        {
                            getSelfQuestion().then((data) =>
                            {
                                setSelfQuestionData(data.data.data);
                                if (data.data.data.length == 0) {
                                    setNoData(true)
                                } else {
                                    setNoData(false)
                                }
                            })
                            setIsLoading(false)
                            setQuestion('');
                        }
                        );

                    }} />
                    <Text style={{ marginTop: 20, fontSize: 15, fontWeight: 'bold' }}> Riwayat pertanyaan</Text>
                </View>
                {noData ?
                    <ScrollView style={{ alignContent: 'center', marginVertical: 20 }} refreshControl={<RefreshControl
                        refreshing={isLoadingList} onRefresh={() =>
                        {
                            setIsLoadingList(true)
                            getSelfQuestion().then((data) =>
                            {
                                setSelfQuestionData(data.data.data)
                                if (data.data.data.length == 0) {
                                    setNoData(true)
                                } else {
                                    setNoData(false)
                                }
                                setIsLoadingList(false)
                            })
                        }}
                    />} >
                        <Image source={require('../assets/nodata.png')} style={{ 'width': "75%", alignSelf: 'center', 'height': 200 }} />
                        <Text style={{ color: 'tomato', fontWeight: 'bold', alignSelf: 'center' }}>Belum ada pertanyaan</Text>
                        <Text style={{ color: 'tomato', fontWeight: 'bold', alignSelf: 'center' }}>Ayo Mulai tanya</Text>
                    </ScrollView> :
                    <FlatList
                        style={{ marginHorizontal: 10, marginVertical: 10, height: '100%' }}
                        onEndReachedThreshold={0.01}
                        refreshing={isLoadingList}
                        onRefresh={() =>
                        {
                            setIsLoadingList(true)
                            getSelfQuestion().then((data) =>
                            {
                                setSelfQuestionData(data.data.data)
                                if (data.data.data.length == 0) {
                                    setNoData(true)
                                } else {
                                    false
                                }
                                setIsLoadingList(false)
                            })
                        }}
                        data={!isFetched ? dummyData : selfQuestionData}
                        nestedScrollEnabled={true}
                        renderItem={({ item }) =>
                            <CardComponent photoPath={MMKV.getString('photoProfile')} isFetched={isFetched} data={item} />}
                    />
                }



            </View>
        </SafeAreaView>
    )
}

export default AskDoctorScreen

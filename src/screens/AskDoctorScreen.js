import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, FlatList, Button } from 'react-native'
import { MMKV } from 'react-native-mmkv'
import { TextInput } from 'react-native-paper'
import GlobalButton from '../component/atoms/GlobalButton'
import CardComponent from '../component/molecules/CardComponent'
import { getSelfQuestion, postAskQuestion } from '../services/askDoctor.service'
import { useDispatch } from 'react-redux'

const AskDoctorScreen = () =>
{


    const [question, setQuestion] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingList, setIsLoadingList] = useState(false);

    const [isFetched, setIsFetched] = useState(false);
    const [selfQuestionData, setSelfQuestionData] = useState([]);

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
                setIsFetched(true);
            })
        }
    })

    return (
        <SafeAreaView>
            <View style={{ padding: 10, display: 'flex', height: '100%' }}>
                <View style={{ margin: 10 }}>
                    <Text style={{ fontSize: 15 }}>Kamu bisa tanyakan pertanyaan seputar MESH</Text>
                </View>
                <View>
                    <TextInput
                        multiline
                        mode="outlined"
                        value={question}
                        numberOfLines={3}
                        style={{ margin: 10 }}
                        onChangeText={(data) => setQuestion(data)}
                    ></TextInput>
                </View>
                <View style={{ margin: 2, marginHorizontal: 10 }}>
                    <GlobalButton disabled={question == ""} title={isLoading ? "Loading..." : "Kirim Pertanyaan"} onPress={() =>
                    {
                        setIsLoading(true);

                        postAskQuestion(question, 1).then((data) =>
                        {
                            getSelfQuestion().then((data) =>
                            {
                                setSelfQuestionData(data.data.data);
                            })
                            setIsLoading(false)
                            setQuestion('');
                        }
                        );

                    }} />
                </View>
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
                            setIsLoadingList(false)
                        })
                    }}
                    data={!isFetched ? dummyData : selfQuestionData}
                    nestedScrollEnabled={true}
                    renderItem={({ item }) => <CardComponent photoPath={MMKV.getString('photoProfile')} isFetched={isFetched} data={item} />}
                />
            </View>
        </SafeAreaView>
    )
}

export default AskDoctorScreen

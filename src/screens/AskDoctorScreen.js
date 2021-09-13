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
                <View style={{ margin: 5 }}>
                    <Text style={{ fontSize: 20 }}>Kirim pertanyaanmu</Text>
                </View>
                <View>
                    <TextInput
                        multiline
                        mode="outlined"
                        numberOfLines={3}
                        style={{ margin: 10 }}
                        onChangeText={(data) => setQuestion(data)}
                    ></TextInput>
                </View>
                <View style={{ margin: 2, marginHorizontal: 10 }}>
                    <GlobalButton title={isLoading ? "Loading..." : "Kirim Pertanyaan"} onPress={() =>
                    {
                        setIsLoading(true);
                        postAskQuestion(question, 1).then((data) =>
                        {
                            getSelfQuestion().then((data) =>
                            {
                                setSelfQuestionData(data.data.data);
                            })
                            setIsLoading(false)
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
                    data={selfQuestionData}
                    nestedScrollEnabled={true}
                    renderItem={({ item }) => <CardComponent photoPath={MMKV.getString('photoProfile')} data={item} />}
                />
            </View>
        </SafeAreaView>
    )
}

export default AskDoctorScreen

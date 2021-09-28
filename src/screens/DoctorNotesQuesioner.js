import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, Alert } from 'react-native'
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { RadioButton, TextInput } from 'react-native-paper';
import GlobalButton from '../component/atoms/GlobalButton';
import { getQuestion, postQuestion } from '../services/doctorNotes.service';

const DoctorNotesQuesioner = ({ navigation }) =>
{
    const [questionData, setQuestionData] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() =>
    {
        if (!isFetched) {
            getQuestion().then((data) =>
            {
                setQuestionData(data.data.data);
                setIsFetched(true);
            })
        }
    });

    return (
        <SafeAreaView>
            <ScrollView style={{ marginHorizontal: 20 }}>
                {questionData.map((dt, index) =>
                    <View style={{ marginVertical: 10 }} key={index}>
                        <Text style={{ fontWeight: "800", fontSize: 14 }}>{dt.question}</Text>
                        {dt.hasChildren == 1 ?

                            <CompOption dt={dt} />
                            :
                            <TextInput mode="outlined" key={dt.id} onChangeText={(data) =>
                            {
                                dt.answer = data;
                            }} />
                        }
                    </View>
                )}
                <View style={{ marginVertical: 10 }}>
                    <GlobalButton disabled={isLoading} title="kirim" onPress={() =>
                    {
                        setIsLoading(true);
                        postQuestion(questionData).then((data) => setIsLoading(false))
                        Alert.alert('Info', 'Quesioner mu berhasil dikirim')
                        navigation.navigate("DoctorNotesScreen")
                    }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const CompOption = ({ dt }) =>
{
    const [tesOpt, setTesOpt] = useState('')
    return (<View >
        {dt.doctor_notes_children.map((dt2, index2) =>
            <RectButton onPress={() => { dt.answer = dt2.child_question; setTesOpt(dt2.child_question) }}
                key={dt2.id} style={{ display: 'flex', flexDirection: 'row' }}>
                <RadioButton
                    color={'tomato'}
                    value={dt2.child_question}
                    status={dt2.child_question == tesOpt ? 'checked' : 'unchecked'}
                />
                <Text style={{ alignSelf: 'center' }}>{dt2.child_question}</Text>
            </RectButton>
        )}
    </View>)
}

export default DoctorNotesQuesioner

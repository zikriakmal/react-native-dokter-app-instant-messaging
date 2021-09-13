import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { TextInput } from 'react-native-paper';
import GlobalButton from '../component/atoms/GlobalButton';
import { getQuestion, postQuestion } from '../services/doctorNotes.service';

const DoctorNotesQuesioner = () =>
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
            <View style={{marginHorizontal:10}}>
                {questionData.map((dt, index) =>
                    <View style={{marginVertical:10}} key={index}>
                        <Text style={{fontWeight:"800",fontSize:16}}>{dt.question}</Text>
                        <TextInput mode="outlined" key={dt.id} onChangeText={(data) =>
                        {
                            dt.answer = data;
                        }} />
                    </View>
                )}
                <View style={{marginVertical:10}}>
                    <GlobalButton disabled={isLoading}  title="kirim"  onPress={() => { 
                        setIsLoading(true);
                        postQuestion(questionData).then((data) => setIsLoading(false)) 
                        }} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default DoctorNotesQuesioner

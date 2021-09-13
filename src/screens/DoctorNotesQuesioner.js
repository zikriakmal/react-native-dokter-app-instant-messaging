import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, Alert } from 'react-native'
import { TextInput } from 'react-native-paper';
import GlobalButton from '../component/atoms/GlobalButton';
import { getQuestion, postQuestion } from '../services/doctorNotes.service';

const DoctorNotesQuesioner = ({navigation}) =>
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
                        Alert.alert('Info','Quesioner mu berhasil dikirim')
                        navigation.navigate("DoctorNotesScreen")
                        }} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default DoctorNotesQuesioner

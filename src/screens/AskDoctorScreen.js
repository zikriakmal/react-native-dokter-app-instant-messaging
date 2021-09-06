import React from 'react'
import { View, Text, SafeAreaView, ScrollView, FlatList } from 'react-native'
import { TextInput } from 'react-native-paper'
import GlobalButton from '../component/atoms/GlobalButton'
import CardComponent from '../component/molecules/CardComponent'

const AskDoctorScreen = () =>
{
    const data = [
        { key: 1, id: 1, hai: 'hai' },
        { key: 2, id: 1, hai: 'hai' },
        { key: 3, id: 1, hai: 'hai' },
    ]

    return (
        <SafeAreaView>
            <View style={{ padding: 10, display: 'flex',height:'100%' }}>
                <View style={{ margin: 5 }}>
                    <Text style={{ fontSize: 20 }}>Tulis Pertanyaan Kamu!</Text>
                </View>
                <View>
                    <TextInput
                        multiline
                        mode="outlined"
                        numberOfLines={3}
                        style={{ margin: 10 }}
                    ></TextInput>
                </View>
                <View style={{ margin: 2, marginHorizontal: 10 }}>
                    <GlobalButton title="Kirim Pertanyaan" onPress={() => { alert('a') }} />
                </View>
                <FlatList
                    style={{ marginHorizontal: 10,marginVertical:10, height: '100%' }}
                    onEndReachedThreshold={0.01}
                    data={data}
                    nestedScrollEnabled={true}
                    renderItem={({ item }) => <CardComponent />}
                />
            </View>
        </SafeAreaView>
    )
}

export default AskDoctorScreen

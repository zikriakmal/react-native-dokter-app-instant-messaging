import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import GlobalButton from '../component/atoms/GlobalButton'


const ChildComp = ({ title, value }) =>
{
    return (
    <View style={{ backgroundColor: 'white', marginHorizontal: 20, marginVertical: 5, borderRadius: 10, padding: 15, elevation: 3 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', padding: 10, paddingBottom: 0 }} >{title}</Text>
        <Text style={{ fontSize: 12, fontWeight: '300', padding: 10 }} >{value}</Text>
    </View>)
}


const DoctorDetailScreen = ({ route, navigation }) =>
{
    const data = route.params.data;

    return (
        <SafeAreaView >
            <ScrollView style={{ backgroundColor: '#f2f2f2', height: "89%" }}>
                <View style={{ backgroundColor: 'white', marginBottom: 10 }}>
                    <Image source={{ uri: route.params.uri }} style={{
                        width: '100%',
                        height: 250,
                        overflow: "hidden",
                    }} />

                    <View elevation={8}  style={{padding:10,marginTop:-10,paddingBottom:30,backgroundColor:'white',borderTopLeftRadius:15,borderTopRightRadius:15}}>
                        <Text style={styles.header_text} >{route.params.name}</Text>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center' }} >{data.status}</Text>
                    </View>
                </View>
                <ChildComp title={'Pendidikan Terakhir'} value={data.education} />
                <ChildComp title={'Tempat Praktik'} value={data.hospital} />

            </ScrollView>
            <View style={{ padding: 15, paddingBottom: 10, }}>
                <GlobalButton title="Chat Sekarang" onPress={() => navigation.navigate('ChatDetail', { name: route.params.name, id: route.params.id })} />
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    header_text: {
        textAlign: 'center',
        fontSize: 18,
        margin: 5,
        fontWeight: 'bold'
    },
});

export default DoctorDetailScreen

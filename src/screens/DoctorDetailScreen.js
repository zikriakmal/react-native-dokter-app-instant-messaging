import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import GlobalButton from '../component/atoms/GlobalButton'


const DoctorDetailScreen = ({route,navigation}) =>
{
    return (
        <SafeAreaView style={{display:'flex'}}>
            <ScrollView style={{ backgroundColor: '#f2f2f2',height:"85%" }}>
                <View style={{ backgroundColor: 'white', marginBottom: 10,paddingBottom:15 }}>
                    <Image source={{uri:route.params.uri}} style={{
                        width: '100%',
                        height: 200,
                        overflow: "hidden",
                    }} />

                    <Text style={styles.header_text} >{route.params.name}</Text>
                    <Text style={{fontSize:20,textAlign:'center'}} >Specialist kanduangan</Text>
                </View>
                <View style={{ backgroundColor: 'white', margin: 10,borderRadius:10,padding:15 }}>
                    <Text style={{fontSize:20,fontWeight:'bold',padding:10,paddingBottom:5}} >Nomor STR</Text>
                    <Text style={{fontSize:20,fontWeight:'300',padding:10}} >711111122223</Text>
                </View>
                <View style={{ backgroundColor: 'white', margin: 10,borderRadius:10,padding:15 }}>
                    <Text style={{fontSize:20,fontWeight:'bold',padding:10,paddingBottom:5}} >Pendidikan Terakhir</Text>
                    <Text style={{fontSize:20,fontWeight:'300',padding:10}} >Universitas Sumatera Utara</Text>
                    <Text style={{fontSize:20,fontWeight:'300',padding:10}} >2020</Text>
                </View>
                <View style={{ backgroundColor: 'white', margin: 10,borderRadius:10,padding:15 }}>
                    <Text style={{fontSize:20,fontWeight:'bold',padding:10,paddingBottom:5}} >Tempat Praktik</Text>
                    <Text style={{fontSize:20,fontWeight:'300',padding:10}} >RS USU</Text>
                </View>
            </ScrollView>
            <View style={{padding:20}}>
                <GlobalButton title="Chat Sekarang" onPress={()=> navigation.navigate('ChatDetail', { name: route.params.name ,id:route.params.id  })}/>
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    header_text: {
        textAlign: 'center',
        fontSize: 20,
        margin: 5,
        fontWeight:'bold'
    },
});

export default DoctorDetailScreen

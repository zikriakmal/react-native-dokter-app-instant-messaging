import React from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableHighlight, Image, FlatList, TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native';
import { BaseButton, RawButton, RectButton, TextInput } from 'react-native-gesture-handler';




const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor:'#dddddd',
        borderWidth:0.5,
        borderRadius:10,
        shadowRadius: 3, shadowOpacity: 0.2, 
        shadowOffset: { width: 2, height: -1 }, shadowColor: 'black',
        margin: 20,
        backgroundColor:'white'
    },
    item: {
        backgroundColor: 'red',
        borderWidth: 2,
        borderBottomColor: 'black',
    },
});

const data = [
    { id: '1', name: 'Dokter Subandono', status: 'busy' },
    { id: '2', name: 'Dokter SitiHajar', status: 'available' },
    { id: '3', name: 'Dokter Ku Doktermu', status: 'busy' },
    { id: '4', name: 'Dokter Nugosyah', status: 'busy' }
];

const FlatListBasics = ({ navigation }) =>
{
    return (
        <View style={styles.container}>
            <Text style={{alignSelf:'center','marginTop':5,'marginBottom':5,fontSize:20,fontWeight:'700',color:'tomato'}}> Ayo Dokter</Text>
            <Text style={{alignSelf:'center','marginBottom':5,fontSize:14,color:'#3d3d3d'}}>Chat bersama dokter</Text>
            <FlatList
                data={data}
                renderItem={({ item }) => <DokterChild style={styles.item} name={item.name} status={item.status} navigation={navigation} />}
            />
        </View>)
}

const DokterChild = ({ navigation, name, status, ...props }) =>
{

    //  const dispatch = useDispatch()
     
    return (
            
        <RectButton 
        
        style={{ borderColor: '#dddddd' }}   onPress={() => {
            // console.log('ehhe');
            
            navigation.navigate('ChatDetail',{ name: name });
            }}>
            <View style={{ 'display': 'flex', 'flexDirection': 'row',padding:20,borderBottomWidth:1,borderBottomColor:'#dddddd' }}>
                <Image source={require('../assets/ayodokter.png')} style={{
                    width: 50,
                    height: 50,
                    borderRadius: 150 / 2,
                    overflow: "hidden",
                    borderWidth: 3,
                    borderColor: "tomato"
                }} />
                <View style={{ 'display': 'flex', 'flexDirection': 'column', 'paddingHorizontal': 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '300' }}>{name}</Text>
                    <Text style={{ fontSize: 14, fontWeight: '800', color: "#2e2e2e" }}>{status}</Text>
                </View>
            </View>
        </RectButton>
    )
}

const UselessTextInput = (props) =>
{
    return (
        <TextInput
            {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
            editable
            placeholder="cari dokter kamu !"
        />
    );
}

const ChatAreaScreen = ({ navigation }) =>
{
    
    return (
        <SafeAreaView style={{ 'backgroundColor': 'white', 'height': '100%' }} >
            {/* <ScrollView > */}

            <View
                elevation={3}
                style={{
                    borderRadius: 20,
                    
                    backgroundColor: 'white',
                    margin: 20, shadowRadius: 3, shadowOpacity: 0.2, shadowOffset: { width: 2, height: -1 }, shadowColor: 'black'

                }}>
                <UselessTextInput
                    style={{ paddingHorizontal: 15, paddingVertical: 10 }}
                    onChangeText={(text) => console.log(text)}
                />
            </View>
            <FlatListBasics navigation={navigation} />
            {/* <DokterChild navigation={navigation}/>  */}

            {/* </ScrollView> */}
        </SafeAreaView>

    )
}

export default ChatAreaScreen

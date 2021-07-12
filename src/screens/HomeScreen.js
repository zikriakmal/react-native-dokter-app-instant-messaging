import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableHighlight, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { StyleSheet } from 'react-native';
import { BaseButton, RawButton, RectButton, TextInput } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        borderColor: '#dddddd',
        height:500,
        borderWidth: 0.5,
        borderRadius: 10,
        shadowRadius: 3, shadowOpacity: 0.2,
        shadowOffset: { width: 2, height: -1 }, shadowColor: 'black',
        backgroundColor: 'white',
    },
    item: {
        backgroundColor: 'red',
        borderWidth: 2,
        borderBottomColor: 'black',
    },
});

const data = [
    { id: '1', name: 'Dokter Subandono', status: 'busy' },
    { id: '2', name: 'Dokter SitiHajar', status: 'online' },
    { id: '3', name: 'Dokter Ku Doktermu', status: 'offline' },
    { id: '4', name: 'Dokter Ku Doktermu', status: 'offline' },
    { id: '5', name: 'Dokter Ku Doktermu', status: 'offline' },
    { id: '6', name: 'Dokter Ku Doktermu', status: 'offline' },
    { id: '7', name: 'Dokter Nugosyah', status: 'offline' }
];

const FlatListBasics = ({ navigation }) =>
{
    return (
        <View style={styles.container} elevation={10} >
            <Text style={{ alignSelf: 'center', 'marginTop': 5, 'marginBottom': 5, fontSize: 20, fontWeight: '700', color: 'tomato' }}> Ayo Dokter</Text>
            <Text style={{ alignSelf: 'center', 'marginBottom': 5, fontSize: 14, color: '#3d3d3d' }}>Chat bersama dokter</Text>
            <View
                elevation={20}
                style={{
                    borderRadius: 15,
                    backgroundColor: 'white',
                    margin: 10, marginHorizontal: 20, shadowRadius: 3, shadowOpacity: 0.2, shadowOffset: { width: 2, height: -1 }, shadowColor: 'black'

                }}>
                <DokterChatInput
                    style={{ paddingHorizontal: 15, paddingVertical: 10 }}
                    onChangeText={(text) => console.log(text)}
                />
            </View>
            <FlatList
                nestedScrollEnabled={true}
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
            style={{ borderColor: '#dddddd' }} onPress={() =>
            {
                // console.log('ehhe');
                navigation.navigate('ChatDetail', { name: name });
            }}>
            <View style={{ 'display': 'flex', 'flexDirection': 'row', padding: 20, borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
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

const DokterChatInput = (props) =>
{
    return (
        <TextInput
            {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
            editable
            placeholder="cari dokter kamu !"
        />
    );
}

const AppScrollViewIOSBounceColorsWrapper = ({
    topBounceColor,
    bottomBounceColor,
    children,
    ...props
}) =>
{
    return (
        <View {...props} style={[{ position: 'relative' }, props.style]}>
            {children}
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1, // appear under the scrollview
                }}
            >
                <View
                    style={{ flex: 1, backgroundColor: topBounceColor }}
                />
                <View
                    style={{ flex: 1, backgroundColor: bottomBounceColor }}
                />
            </View>
        </View>
    );
};



const HomeScreen = ({ navigation }) =>
{
    const [loadingState, setLoadingState] = useState(false)

    return (
        <SafeAreaView style={{ 'flex': 1, 'backgroundColor': 'tomato', 'height': '100%' }} >
            <AppScrollViewIOSBounceColorsWrapper
                style={{ flex: 1 }}
                topBounceColor="tomato"
                bottomBounceColor="white"
            >
                <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }}>
                    <View style={{ 'backgroundColor': 'white' }}>
                        <View style={{
                            height: 160, borderBottomStartRadius: 50,
                            padding: 20,
                            borderBottomEndRadius: 50, backgroundColor: 'tomato'
                        }}>
                            {loadingState ? <ActivityIndicator animating={true} color='white' /> : <Text></Text>}
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Avatar.Image size={50} source={require('../assets/ayodokter.png')} />
                                <Text style={{ color: 'white', alignSelf: 'center', 'marginHorizontal': 15, 'fontWeight': 'bold', 'fontSize': 18 }}>Halo nugasyah</Text>
                            </View>
                        </View>
                        <View style={{ zIndex: 2, marginTop: -75, margin: 20 }} >
                            <View style={{
                                // justifyContent: 'center',
                                display: 'flex',
                                flexDirection: 'row',
                                elevation: 15,
                                borderRadius: 10, backgroundColor: 'white', marginVertical: 20, paddingHorizontal: 30, paddingVertical: 20, shadowRadius: 3, shadowOpacity: 0.2,
                                shadowOffset: { width: 2, height: -1 }, shadowColor: 'black',
                            }}>
                                <View style={{display:'flex',flex:1}}>
                                    <Avatar.Icon elevation={5} size={50} color={'white'} icon="calendar" style={
                                        {
                                            alignSelf:'center',
                                            shadowRadius: 4, shadowOpacity: 0.4,
                                            shadowOffset: { width: 2, height: 2 }, shadowColor: 'black',
                                        }
                                    } />
                                    <Text style={{'alignSelf':'center','fontWeight':'600','marginTop':10}}>Buat Janji</Text>
                                </View>
                                
                                <View style={{display:'flex',flex:1}}>
                                    <Avatar.Icon elevation={5} size={50} color={'white'} icon="comment-edit" style={
                                        {
                                            alignSelf:'center',
                                            shadowRadius: 4, shadowOpacity: 0.4,
                                            shadowOffset: { width: 2, height: 2 }, shadowColor: 'black',
                                        }
                                    } />
                                    <Text style={{'alignSelf':'center','fontWeight':'600','marginTop':10}}>Tanya Dokter</Text>
                                </View>
                                
                                <View style={{display:'flex',flex:1}}>
                                    <Avatar.Icon elevation={5} size={50} color={'white'} icon="note" style={
                                        {
                                            alignSelf:'center',
                                            shadowRadius: 4, shadowOpacity: 0.4,
                                            shadowOffset: { width: 2, height: 2 }, shadowColor: 'black',
                                        }
                                    } />
                                    <Text style={{'alignSelf':'center','fontWeight':'600','marginTop':10}}>Catatan Dokter</Text>
                                </View>
                                

                            </View>
                            <FlatListBasics navigation={navigation} />
                        </View>
                    </View>
                    {/* <WhiteBackgroundBody /> */}
                    {/* <YellowBackgroundFooter /> */}
                </ScrollView>
            </AppScrollViewIOSBounceColorsWrapper>


        </SafeAreaView>

    )
}

export default HomeScreen


import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { FlatList, RectButton, TextInput } from 'react-native-gesture-handler';






const DokterChild = ({ navigation,id, name, status,photoPath, ...props }) =>
{

    return (
        <RectButton 
            underlayColor="#FF826B"
            style={{ borderColor: '#dddddd' }} rippleColor="#FF826B" onPress={() =>
            {
                // navigation.navigate('ChatDetail', { name: name,id:id  });
                navigation.navigate('DoctorDetailScreen', { name: name,id:id  });
            }}>
            <View style={{ 'display': 'flex', 'flexDirection': 'row', padding: 20, borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
                <Image source={{uri:photoPath}} style={{
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


const FindDoctorComponent = ({ data,navigation,endOfDoctorFunc,isLoading,...props }) =>
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
                onEndReachedThreshold={0.01}
                onEndReached={(distanceFromEnd) => {if (distanceFromEnd < 0) return;}}
                data={data}
                navigation={navigation}
                renderItem={({ item }) => <DokterChild style={styles.item} key={item.id}
                photoPath={item.photo_path} 
                id={item.id} name={item.name} status={item.status} navigation={navigation} />}
            />
            <View>
              <Text style={{ textAlign:'center'}}> {isLoading ? "Loading..." : ""}</Text> 
            </View>

        </View>)
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: '#dddddd',
        height: 500,
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


export default FindDoctorComponent 
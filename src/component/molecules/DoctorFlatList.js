import React from 'react'
import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import { RectButton } from 'react-native-gesture-handler';




const DokterChild = ({ navigation,origin, id, name, status, ...props }) =>
{

    return (
        <RectButton
            underlayColor="#FF826B"
            style={{ borderColor: '#dddddd' }} rippleColor="#FF826B" onPress={() =>
            {
                if(origin == 'appointment'){
                    navigation.navigate('AppointmentDetail', { name: name, id: id });
                }else{
                    navigation.navigate('ChatDetail', { name: name, id: id });
                }
            }}>
            <View style={{ 'display': 'flex', 'flexDirection': 'row', padding: 20, borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
                <Image source={require('../../assets/ayodokter.png')} style={{
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


const DoctorFlatList = ({ data, navigation,origin }) =>
{
    return (
        <View>
            <FlatList
                data={data}
                navigation={navigation}
                renderItem={({ item }) =>
                    <DokterChild style={styles.item} key={item.id} id={item.id}
                        name={item.name} status={item.status}
                        navigation={navigation} origin={origin} />}
            />
        </View>
    )
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

export default DoctorFlatList

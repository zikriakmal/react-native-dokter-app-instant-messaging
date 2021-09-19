
import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import { FlatList, RectButton, TextInput } from 'react-native-gesture-handler';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const DokterChild = ({ navigation, id, name, status, photoPath, datanya, isFetched, ...props }) =>
{

    return (
        <RectButton
            underlayColor="#FF826B"
            style={{ borderColor: '#dddddd' }} rippleColor="#FF826B" onPress={() =>
            {
                // navigation.navigate('ChatDetail', { name: name,id:id  });
                navigation.navigate('DoctorDetailScreen', { name: name, id: id, uri: photoPath, data: datanya });
            }}>
            {isFetched ?
                <View style={{ 'display': 'flex','alignContent':'space-between', 'flexDirection': 'row', padding: 20, borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
                    <Image source={{ uri: photoPath }} style={{
                        width: 50,
                        height: 50,
                        borderRadius: 150 / 2,
                        overflow: "hidden",
                        borderWidth: 3,
                        borderColor: "tomato",

                    }} />

                    <View style={{ 'display': 'flex', 'flexDirection': 'column', 'marginHorizontal': 22 }}>
                        <Text style={{ fontSize: 14, fontWeight: '300' }}>{name}</Text>
                        <Text style={{ fontSize: 12, fontWeight: '800', color: "#2e2e2e" }}>{status}</Text>
                    </View>
                </View>
                :
                <View style={{ 'display': 'flex', 'flexDirection': 'row', padding: 20, borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
                    <ShimmerPlaceHolder style={{
                        width: 50,
                        height: 50,
                        borderRadius: 150 / 2,
                        overflow: "hidden"
                    }} />
                    <View style={{ 'display': 'flex', 'flexDirection': 'column', 'paddingHorizontal': 20 }}>
                        <ShimmerPlaceHolder style={{ fontSize: 16, fontWeight: '300', marginVertical: 5, borderRadius: 10 }} />
                        <ShimmerPlaceHolder style={{ fontSize: 12, fontWeight: '800', color: "#2e2e2e", borderRadius: 10 }} />
                    </View>
                </View>}
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


const FindDoctorComponent = ({ data, navigation, endOfDoctorFunc, isLoading, isFetched, ...props }) =>
{
    return (
        <View style={styles.container} elevation={10} >
            <Text style={{ alignSelf: 'center', 'marginTop': 15, 'marginBottom': 5, fontSize: 18, fontWeight: 'bold', color: 'tomato' }}>Chat langsung</Text>
            <Text style={{ alignSelf: 'center', 'marginBottom': 5, fontSize: 12, color: '#3d3d3d',fontWeight:'800' }}>konsultasi dengan chat secara langsung</Text>
            <View
                elevation={20}
                style={{
                    borderRadius: 15,
                    backgroundColor: 'white',
                    margin: 2, marginHorizontal: 20, shadowRadius: 3, shadowOpacity: 0.2, shadowOffset: { width: 2, height: -1 }, shadowColor: 'black'

                }}>
                {/* <DokterChatInput
                    style={{ paddingHorizontal: 15, paddingVertical: 7 }}
                    onChangeText={(text) => { }}
                /> */}
            </View>
            <FlatList
                onEndReachedThreshold={0.01}
                onEndReached={(distanceFromEnd) => { if (distanceFromEnd < 0) return; }}
                data={isFetched ? data : [
                    { key: 1, photoPath: null, id: null, name: null, navigation: null, isFetched: false },
                    { key: 2, photoPath: null, id: null, name: null, navigation: null, isFetched: false }
                ]}
                navigation={navigation}
                renderItem={({ item }) => <DokterChild style={styles.item}
                    key={item.id}
                    photoPath={item.photo_path}
                    datanya={item}
                    id={item.id}
                    name={item.name}
                    status={item.status}
                    navigation={navigation}
                    isFetched={isFetched}
                />}
            />
            <View>
                <Text style={{ textAlign: 'center' }}> {isLoading ? "Loading..." : ""}</Text>
            </View>

        </View>)
}




const styles = StyleSheet.create({
    container: {
        borderColor: '#dddddd',
        height: Dimensions.get('window').height - (Dimensions.get('window').height * 0.46),
        paddingHorizontal:10,
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
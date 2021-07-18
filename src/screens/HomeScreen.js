import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableHighlight, Image, FlatList, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { Avatar } from 'react-native-paper';

import MenuComponent from '../component/organisms/MenuComponent';
import FindDoctorComponent from '../component/organisms/FindDoctorComponent';
import {firebase} from '../../firebase';

const data = [
    { id: '1', name: 'Dokter Subandono', status: 'busy' },
    { id: '2', name: 'Dokter SitiHajar', status: 'online' },
    { id: '3', name: 'Dokter Ku Doktermu', status: 'offline' },
    { id: '4', name: 'Dokter Ku Doktermu', status: 'offline' },
    { id: '5', name: 'Dokter Ku Doktermu', status: 'offline' },
    { id: '6', name: 'Dokter Ku Doktermu', status: 'offline' },
    { id: '7', name: 'Dokter Nugosyah', status: 'offline' }
];


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
                {/* <View
                    style={{ flex: 1, backgroundColor: topBounceColor }}
                /> */}
                <LinearGradient style={{ flex: 1 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['tomato', '#FF826B', '#ffb1a3']} />

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

    const db = firebase.firestore();
    const query = db.collection('doctors');
    const [doctors,setDoctors]= useState([]);

    useEffect(() =>
    {
        // Subscribe to query with onSnapshot
        const unsubscribe = query.onSnapshot(querySnapshot =>
        {
            // Get all documents from collection - with IDs
            const fetchedTasks = [];

            querySnapshot.docs.forEach(childSnapshot =>
            {
                // return doc;
                const key = childSnapshot.id;
                const data = childSnapshot.data();
                fetchedTasks.push({ id: key, ...data });
                setDoctors(fetchedTasks);
            });
        });
        // Detach listener
        return unsubscribe;
    }, []);




    return (

        <LinearGradient style={{
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width, overflow: 'hidden', flex: 1
        }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['tomato', '#FF826B', '#ffb1a3']}>
            <SafeAreaView style={{ 'flex': 1 }} >

                <AppScrollViewIOSBounceColorsWrapper
                    style={{ flex: 1 }}
                    topBounceColor="#FF826B"
                    bottomBounceColor="white"
                >
                    <ScrollView nestedScrollEnabled={true} keyboardShouldPersistTaps='always' style={{ flex: 1 }}>
                        <View style={{ 'backgroundColor': 'white' }}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['tomato', '#FF826B', '#ffb1a3']}
                                style={{
                                    backgroundColor: 'white',
                                    height: 160,
                                    borderBottomLeftRadius: 50,
                                    borderBottomRightRadius: 50,
                                    borderBottomStartRadius: 50,
                                    borderBottomEndRadius: 50,
                                    padding: 20,
                                }}>
                                {loadingState ? <ActivityIndicator animating={true} color='white' /> : <Text></Text>}
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Avatar.Image size={50} source={require('../assets/ayodokter.png')} />
                                    <Text style={{ color: 'white', alignSelf: 'center', 'marginHorizontal': 15, 'fontWeight': 'bold', 'fontSize': 18 }}>Halo nugasyah</Text>
                                </View>
                            </LinearGradient>
                            <View style={{ zIndex: 2, marginTop: -75, margin: 20 }} >
                                <MenuComponent navigation={navigation} />
                                <FindDoctorComponent navigation={navigation}
                                    nestedScrollEnabled={true} data={doctors}
                                />
                            </View>
                        </View>
                        {/* <WhiteBackgroundBody /> */}
                        {/* <YellowBackgroundFooter /> */}
                    </ScrollView>
                </AppScrollViewIOSBounceColorsWrapper>

            </SafeAreaView>
        </LinearGradient >
    )
}

export default HomeScreen

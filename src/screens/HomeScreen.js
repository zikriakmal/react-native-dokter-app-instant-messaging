import React, { useEffect, useState } from 'react'

import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, Dimensions, RefreshControl, StatusBar } from 'react-native'
import { Avatar } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

import { MMKV } from 'react-native-mmkv';

import { GetInfo } from '../services/user.service';
import { GetDoctorList } from '../services/doctor.service';

import MenuComponent from '../component/organisms/MenuComponent';
import FindDoctorComponent from '../component/organisms/FindDoctorComponent';

import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { useSelector } from 'react-redux';


const HomeScreen = ({ navigation }) =>
{
    const [loadingState, setLoadingState] = useState(false)
    const [username, setUsernameState] = useState("")
    const [photo, setPhoto] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")

    const [doctors, setDoctors] = useState([]);
    const [counter, setCounter] = useState(10);
    const [isFetched, setIsFetched] = useState(false);
    const [isFetchedDoctor, setIsFetchedDoctor] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);


    const selector = useSelector(state => state);

    useEffect(() =>
    {
        if (doctors.length <= 0) {
            GetDoctorList().then((data) =>
            {
                const dataFetch = data.data.data;
                dataFetch.map((data) =>
                {
                    setDoctors((prev) => ([...prev, {
                        id: data.firebase_id,
                        name: data.name,
                        status: data.specialist,
                        hospital: data.hospital,
                        education: data.education,
                        str: data.str,
                        photo_path: data.photo_path
                    }]));
                })
                setIsFetchedDoctor(true)
            });
            GetInfo().then((data) =>
            {

                MMKV.set('userId', data.data.data.firebase_id);
                MMKV.set('username', data.data.data.username);
                MMKV.set('email', data.data.data.email);
                MMKV.set('photoProfile', data.data.data.photo_path);
                MMKV.set('phoneNumber', data.data.data.phone_number)
                MMKV.set('type', data.data.data.member_type);
                setUsernameState(MMKV.getString('username'));
                setPhoto(data.data.data.photo_path);
                setIsFetched(true);
            });
        }
    }, []);

    const gettingComplex = () =>
    {
        setIsLoading(true)
        if (loadingState == false) {
            GetDoctorList().then((data) =>
            {
                const dataFetch = data.data.data;
                let contol = counter;
                dataFetch.forEach(function (data)
                {
                    contol = contol;
                    contol++
                    setDoctors((prev) => ([...prev,
                    {
                        id: data.firebase_id, name: data.name,
                        status: "online",
                        photo_path: data.photo_path
                    }]));
                    setCounter(contol);
                })
                setIsLoading(false)
            });
        }
    }

    const fullHeight = Dimensions.get('window').height;
    return (
        <LinearGradient style={{
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width, overflow: 'hidden'
        }}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            colors={['tomato', '#FF826B', '#ffb1a3']}>
            <SafeAreaView >

                {/* <AppScrollViewIOSBounceColorsWrapper 
                    topBounceColor="#FF826B"
                    bottomBounceColor="white"> 
                //  <ScrollView nestedScrollEnabled={true} keyboardShouldPersistTaps='always' style={{ flex: 1 }}> */}
            <StatusBar backgroundColor="transparent" translucent/>
                <ScrollView
                    style={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={() =>
                            {
                                // setIsRefreshing(true);
                                setIsFetched(false);
                                setIsFetchedDoctor(false);
                                setDoctors([])
                                GetDoctorList().then((data) =>
                                {
                                    const dataFetch = data.data.data;
                                    dataFetch.map((data) =>
                                    {
                                        setDoctors((prev) => ([...prev, {
                                            id: data.firebase_id,
                                            name: data.name,
                                            status: data.specialist,
                                            hospital: data.hospital,
                                            education: data.education,
                                            str: data.str,
                                            photo_path: data.photo_path
                                        }]));
                                    })
                                    setIsFetchedDoctor(true)
                                });
                                GetInfo().then((data) =>
                                {
                                    MMKV.set('userId', data.data.data.firebase_id);
                                    MMKV.set('username', data.data.data.username);
                                    MMKV.set('email', data.data.data.email);
                                    MMKV.set('photoProfile', data.data.data.photo_path);
                                    MMKV.set('phoneNumber', data.data.data.phone_number)
                                    MMKV.set('type', data.data.data.member_type);
                                    setUsernameState(MMKV.getString('username'));
                                    setPhoto(data.data.data.photo_path);
                                    setIsFetched(true);
                                });

                            }
                            }
                        />
                    }
                    style={{ 'backgroundColor': 'white' }}>
                    <View style={{ height: fullHeight,alignContent:'space-between' }}>
                        <View  >
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['tomato', '#FF826B', '#ffb1a3']}
                                style={{
                                    backgroundColor: 'white',
                                    height: 180,
                                    borderBottomLeftRadius: 50,
                                    borderBottomRightRadius: 50,
                                    borderBottomStartRadius: 50,
                                    borderBottomEndRadius: 50,
                                    padding: 20,
                                     
                                }}>
                                {loadingState ? <ActivityIndicator animating={true} color='white' /> : <Text></Text>}
                                {isFetched ?
                                    <View style={{ display: 'flex', flexDirection: 'row','marginHorizontal':25,marginVertical:20 }}>
                                        <Avatar.Image size={50} source={{ uri: photo }} />
                                        <Text style={{ color: 'white', alignSelf: 'center', 'marginHorizontal': 15, 'fontWeight': 'bold', 'fontSize': 18 }}>{username}</Text>
                                    </View>
                                    :
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <ShimmerPlaceholder LinearGradient={LinearGradient} style={{ height: 50, width: 50, borderRadius: 100 }} />
                                        <ShimmerPlaceholder LinearGradient={LinearGradient} style={{
                                            fontSize: 18,
                                            fontWeight: '300',
                                            marginVertical: 15,
                                            marginHorizontal: 15,
                                            borderRadius: 10
                                        }} />
                                    </View>

                                }
                            </LinearGradient>
                        </View>
                        <View style={{ zIndex: 4, marginTop: -60, margin: 20,marginHorizontal:40, display: 'flex' }} >
                            <MenuComponent navigation={navigation}  />
                            <FindDoctorComponent navigation={navigation}  isLoading={isLoading}
                                nestedScrollEnabled={true} data={doctors} endOfDoctorFunc={gettingComplex} isFetched={isFetchedDoctor} />
                            <View style={{ 'backgroundColor': 'white', 'height': '100%' }}></View>
                        </View>

                    </View>
                </ScrollView>
                {/* </ScrollView> */}
                {/* </AppScrollViewIOSBounceColorsWrapper> */}
            </SafeAreaView>
        </LinearGradient >
    )
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
            <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1, // appear under the scrollview
            }}>
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




export default HomeScreen

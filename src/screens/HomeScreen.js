import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableHighlight, Image, FlatList, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { Avatar } from 'react-native-paper';

import MenuComponent from '../component/organisms/MenuComponent';
import FindDoctorComponent from '../component/organisms/FindDoctorComponent';
import firestore from '@react-native-firebase/firestore';
import { MMKV } from 'react-native-mmkv';
import axios from 'axios';
import { GetInfo } from '../services/user.service';
import { GetDoctorList } from '../services/doctor.service';

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
    const [username, setUsernameState] = useState("")
    const [photo, setPhoto] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")

    const [doctors, setDoctors] = useState([]);
    const [counter, setCounter] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() =>
    {

       GetInfo().then((data) =>
        {
            MMKV.set('username', data.data.data.username);
            setUsernameState(MMKV.getString('username'));
            MMKV.set('userId', data.data.data.firebase_id);
            setPhoto(data.data.data.photo_path);
            MMKV.set('type', data.data.data.member_type);
        });

        GetDoctorList().then((data) =>
        {
            const dataFetch = data.data.data;
            // console.log(dataFetch);
            dataFetch.map((data) =>
            {
                setDoctors((prev) => ([...prev, { id: data.firebase_id, name: data.name, status: "online",photo_path:data.photo_path }]));
            })
        });
    }, []);

    const gettingComplex = () =>
    {
        setIsLoading(true)
        if(loadingState == false){
            GetDoctorList().then((data) =>
            {

                const dataFetch = data.data.data;
                console.log("sekali");
                let contol = counter;
                dataFetch.forEach(function (data)
                {
                    contol = contol; 
                    contol++
                    setDoctors((prev)=>([...prev,{ id: contol, name: data.name, status: "online",photo_path:data.photo_path} ]));
                    setCounter(contol);
                })
                setIsLoading(false)
            });
        }

    }


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
                                    <Avatar.Image size={50} source={{ uri: photo }} />
                                    <Text style={{ color: 'white', alignSelf: 'center', 'marginHorizontal': 15, 'fontWeight': 'bold', 'fontSize': 18 }}>{username}</Text>
                                </View>
                            </LinearGradient>
                            <View style={{ zIndex: 2, marginTop: -75, margin: 20 }} >
                                <MenuComponent navigation={navigation} />
                                <FindDoctorComponent navigation={navigation} isLoading={isLoading}
                                    nestedScrollEnabled={true} data={doctors} endOfDoctorFunc={gettingComplex} 
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

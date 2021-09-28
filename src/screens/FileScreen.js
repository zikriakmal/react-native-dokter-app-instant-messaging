import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, Image, PermissionsAndroid, ScrollView, RefreshControl } from 'react-native'
import { RectButton } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper'
import RNFetchBlob from 'rn-fetch-blob';
import { GetFileList } from '../services/file.service';

import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const FileScreen = () =>
{
    const [fileList, setFileList] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isLoadingList, setIsLoadingList] = useState(false);

    const mockedShimmer = [
        { id: 1, name: '-', path: 'gg' },
        { id: 2, name: '-', path: 'gg' },
        { id: 3, name: '-', path: 'gg' },
        { id: 4, name: '-', path: 'gg' }
    ]
    useEffect(() =>
    {
        if (fileList.length <= 0) {
            GetFileList().then((data) =>
            {
                setFileList(data.data.data)
                if (data.data.data == 0) {
                    setIsEmpty(true)
                } else {
                    setIsEmpty(false)
                }
                setIsFetched(true)
            });
        }

    }, []);

    return (
        <SafeAreaView>
            <ScrollView style={{ marginHorizontal: 20,backgroundColor:'transparent' }}
                refreshControl={<RefreshControl refreshing={isLoadingList} onRefresh={() =>
                {
                    setIsLoadingList(true)
                    GetFileList().then((data) =>
                    {
                        setFileList(data.data.data)
                        if (data.data.data.length == 0) {
                            setIsEmpty(true)
                        } else {
                            setIsEmpty(false)
                        }
                        setIsLoadingList(false)
                    })
                }} />}>
                <Text style={{ fontSize: 16, alignSelf: 'center', marginVertical: 10, fontWeight: 'bold' }}>Daftar materi yang dapat diunduh</Text>
                {
                    isEmpty ?
                        <View style={{ marginVertical: 50 }}>
                            <Image source={require('../assets/nodata.png')} style={{ 'width': "75%", alignSelf: 'center', 'height': 200 }} />
                            <Text style={{ color: 'tomato', fontWeight: 'bold', alignSelf: 'center' }}>Maaf</Text>
                            <Text style={{ color: 'tomato', fontWeight: 'bold', alignSelf: 'center' }}>Belum ada materi tersedia</Text>
                        </View>
                        :
                        isFetched ?
                            fileList.map((data) => <CardedComponent key={data.id} name={data.name} path={data.path} isFetched={isFetched} />)
                            :
                            mockedShimmer.map((data) => <CardedComponent key={data.id} name={data.name} path={data.path} isFetched={isFetched} />)


                }
            </ScrollView>

        </SafeAreaView>
    )
}

const CardedComponent = ({ name, path, isFetched }) =>
{
    const checkPermission = async (url) =>
    {

        // Function to check the platform
        // If Platform is Android then check for permissions.
        if (Platform.OS === 'ios') {
            downloadFile(url);
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message:
                            'Application needs access to your storage to download File',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Start downloading
                    downloadFile(url);
                    console.log('Storage Permission Granted.');
                } else {
                    // If permission denied then show alert
                    Alert.alert('Error', 'Storage Permission Not Granted');
                }
            } catch (err) {
                // To handle permission related exception
                console.log("++++" + err);
            }
        }
    };

    const downloadFile = (url) =>
    {
        console.log(url)
        // Get today's date to add the time suffix in filename
        let date = new Date();
        // File URL which we want to download
        let FILE_URL = url;
        // Function to get extention of the file url
        let file_ext = getFileExtention(FILE_URL);

        file_ext = '.' + file_ext[0];

        // config: To get response by passing the downloading related options
        // fs: Root directory path to download
        const { config, fs } = RNFetchBlob;
        let RootDir = fs.dirs.PictureDir;
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                path:
                    RootDir +
                    '/file_' +
                    Math.floor(date.getTime() + date.getSeconds() / 2) +
                    file_ext,
                description: 'downloading file...',
                notification: true,
                // useDownloadManager works with Android only
                useDownloadManager: true,
            },
        };
        config(options)
            .fetch('GET', FILE_URL)
            .then(res =>
            {
                // Alert after successful downloading
                console.log('res -> ', JSON.stringify(res));
                // alert('File Downloaded Successfully.');
            });
    };

    const getFileExtention = fileUrl =>
    {
        // To get the file extension
        return /[.]/.exec(fileUrl) ?
            /[^.]+$/.exec(fileUrl) : undefined;
    };
    return (
        isFetched ?
            <View elevation={5} style={{ alignItems: 'center', backgroundColor: 'white', marginVertical: 10, marginHorizontal: 10, padding: 20, display: 'flex', flexDirection: 'row', alignContent: 'space-around', borderRadius: 20 }}>
                <Text style={{ flex: 2, alignSelf: 'center', fontSize: 12 }}>{name}</Text>
                <RectButton onPress={() => { checkPermission(path) }} style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Avatar.Icon elevation={10} size={40} color={'white'} icon={"download"} style={
                        {
                            width: 40,
                            alignSelf: 'flex-end',
                            shadowRadius: 4, shadowOpacity: 0.4,
                            shadowOffset: { width: 2, height: 2 },
                            shadowColor: 'black',
                        }
                    }
                    />
                </RectButton>
            </View>
            :
            <View elevation={5} style={{ alignItems: 'center', backgroundColor: 'white', marginVertical: 10, marginHorizontal: 10, padding: 20, display: 'flex', flexDirection: 'row', alignContent: 'space-around', borderRadius: 20 }}>
                <ShimmerPlaceHolder style={{ flex: 2, borderRadius: 20, alignSelf: 'center', marginHorizontal: 10, width: '10%', fontSize: 12 }} />
                <ShimmerPlaceHolder style={{ width: "20%", height: 50, borderRadius: 50 }} />
            </View>
    )

}

export default FileScreen



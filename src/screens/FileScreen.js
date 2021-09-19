import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, Image, PermissionsAndroid, ScrollView } from 'react-native'
import { Avatar } from 'react-native-paper'
import RNFetchBlob from 'rn-fetch-blob';
import { GetFileList } from '../services/file.service';



const FileScreen = () =>
{
    const [fileList, setFileList] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const fileUrl = 'https://www.unm.edu/~unmvclib/powerpoint/pptexamples.ppt';




    useEffect(() =>
    {
        if (fileList.length <= 0) {
            GetFileList().then((data) =>
            {
                setFileList(data.data.data)
                if (fileList.length == 0) {
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
            <ScrollView style={{ marginHorizontal: 20 }}>
                <Text style={{ fontSize: 16, alignSelf: 'center', marginVertical: 10, fontWeight: 'bold' }}>Daftar materi yang dapat diunduh</Text>
                {
                    isEmpty ?
                        <View style={{ marginVertical: 50 }}>
                            <Image source={require('../assets/nodata.png')} style={{ 'width': "75%", alignSelf: 'center', 'height': 200 }} />
                            <Text style={{ color: 'tomato', fontWeight: 'bold', alignSelf: 'center' }}>Maaf</Text>
                            <Text style={{ color: 'tomato', fontWeight: 'bold', alignSelf: 'center' }}>Belum ada materi tersedia</Text>
                        </View>
                        :
                        fileList.map((data) =>
                            <CardedComponent key={data.id} name={data.name} path={data.path} />
                        )}
            </ScrollView>

        </SafeAreaView>
    )
}

const CardedComponent = ({ name, path }) =>
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
        setIsDownloaded(true)
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
                setIsDownloaded(false)
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
        <View elevation={5} style={{ alignItems: 'center', backgroundColor: 'white', marginVertical: 10, marginHorizontal: 10, padding: 20, display: 'flex', flexDirection: 'row', alignContent: 'space-around', borderRadius: 20 }}>
            <Text style={{ flex: 2, alignSelf: 'center', fontSize: 12 }}>{name}</Text>
            <View onPress={() => { checkPermission(path) }} style={{ flex: 1, alignItems: 'flex-end' }}>
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
            </View>
        </View>
    )

}

export default FileScreen



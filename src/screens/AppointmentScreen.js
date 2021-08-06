import React from 'react'
import { View, Text, TextInput} from 'react-native'
import TextInputComponent from '../component/atoms/TextInputComponent';
import DoctorFlatList from '../component/molecules/DoctorFlatList';


const data = [
    { id: '1', name: 'Dokter Subandono', status: 'busy' },
    { id: '2', name: 'Dokter SitiHajar', status: 'online' },
    { id: '3', name: 'Dokter Ku Doktermu', status: 'offline' },
    { id: '4', name: 'Dokter Ku Doktermu', status: 'offline' },
    { id: '5', name: 'Dokter Ku Doktermu', status: 'offline' },
    { id: '6', name: 'Dokter Ku Doktermu', status: 'offline' },
    { id: '7', name: 'Dokter Nugosyah', status: 'offline' }
];



const AppointmentScreen = ({navigation}) => {
    return (
        <View>
            <TextInputComponent/>
            <DoctorFlatList data={data} navigation={navigation} origin={'appointment'} />
        </View>
    )
}

export default AppointmentScreen

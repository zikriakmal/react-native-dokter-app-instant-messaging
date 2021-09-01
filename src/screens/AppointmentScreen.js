import React, { useEffect } from 'react'
import { useState } from 'react';
import { View, Text, TextInput } from 'react-native'
import TextInputComponent from '../component/atoms/TextInputComponent';
import DoctorFlatList from '../component/molecules/DoctorFlatList';
import { GetDoctorList } from '../services/doctor.service';
const data = [
    { id: '1', name: 'Dokter Subandono', status: 'busy' },
    { id: '2', name: 'Dokter SitiHajar', status: 'online' },
];



const AppointmentScreen = ({ navigation }) =>
{
    const [doctors, setDoctors] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() =>
    {
        if (doctors.length <= 0) {
            GetDoctorList().then((data) =>
            {
                const dataFetch = data.data.data;
                dataFetch.map((data) =>
                {
                    setDoctors((prev) => ([...prev, { id: data.firebase_id, name: data.name, status: "Specialist Anak", photo_path: data.photo_path }]));
                })
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
    return (
        <View>
            <TextInputComponent />
            {!isFetched ? <DoctorFlatList
                data={data}
                nestedScrollEnabled={true}
                navigation={navigation}
                isFetched={false}
                />:
            <DoctorFlatList
                data={doctors}
                endOfDoctorFunc={gettingComplex}
                nestedScrollEnabled={true}
                navigation={navigation}
                isFetched={true}
                origin={'appointment'} />}
        </View>
    )
}

export default AppointmentScreen

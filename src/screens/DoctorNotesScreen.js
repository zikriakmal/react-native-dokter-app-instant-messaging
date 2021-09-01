import React from 'react'
import { View, Text, SafeAreaView, FlatList } from 'react-native'
import CardComponent from '../component/molecules/CardComponent'

const DoctorNotesScreen = () => {

const data=[
    {id:1,hai:'hai'},
    {id:2,hai:'halo'}
]
    return (
        <SafeAreaView>
            <FlatList 
                style={{marginHorizontal:10,height:"100%"}}
                onEndReachedThreshold={0.01}
                // onEndReached={(distanceFromEnd) => {if (distanceFromEnd < 0) return;}}
                data={data}
                renderItem={({ item }) => <CardComponent/>}
            />
            <FlatList />
        </SafeAreaView>
   )
}

export default DoctorNotesScreen

import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

const GlobalButton = ({ title, ...props }) =>
{
    return (
        <View>
            <Button dark={true} style={style.button} theme={{ roundness: 20 }} contentStyle={{ height: 45 }} 
                mode="contained" {...props}>
                { title }
            </Button>
        </View>
    )
}

const style = StyleSheet.create({
    button: { }
})

export default GlobalButton
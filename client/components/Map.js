import React, {useState} from "react";
import MapView from 'react-native-maps'
import {Marker} from 'react-native-maps'
import {StyleSheet, View, Dimensions} from 'react-native';

const Map = ({navigation, route}) => {
    const {longitude, latitude, teamMember} = route.params
    console.log(teamMember, longitude, latitude)
    const initialRegion = {
        longitude: longitude,
        latitude: latitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    return (
        <View style={styles.container}>
            <MapView
                region={initialRegion}
                style={styles.mapStyle}
                >
                <Marker
                    coordinate={{longitude: longitude, latitude: latitude}}
                    title={teamMember}
                />
            </MapView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
})
export default Map
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions, StatusBar } from 'react-native';
import SearchBar from './SearchBar';
import { haze, rainy, snow, sunny } from '../assets/backgroundImages/index';

export default function Weather({ weatherData, fetchWeatherData }) {

    const [backgroundImage, setBackgroundImage] = useState(null);

    const { weather,
            name,
            main: { temp, humidity,temp_min,temp_max },
            wind: { speed },
            sys : {country},
            clouds:{all},
            visibility,
    } = weatherData;
    const [{ main }] = weather;

    useEffect(() => {
        setBackgroundImage(getBackgroundImg(main));
    }, [weatherData])

    function getBackgroundImg(weather) {
        if(weather === 'Snow') return snow
        if(weather === 'Clear') return sunny
        if(weather === 'Rain') return rainy
        if(weather === 'Haze') return haze
        return haze;   
    }

    let textColor = backgroundImage !== sunny ? 'white' : 'black'
    
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='rgba(230,0,0, 0.9)' />
            <ImageBackground 
                source={backgroundImage}
                style={styles.backgroundImg}
                resizeMode='cover'
            >
                <SearchBar fetchWeatherData={fetchWeatherData} />

                <View style={{alignItems: 'center' ,marginTop:50,}}>
                    <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold', fontSize: 30 }}>{name} , {country}</Text>
                    
                    <Text style={{ ...styles.headerText, color: textColor,fontSize:50,}}>{Math.floor(temp)} °C</Text>
                    
                    <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold',fontSize:18,}}>{main}</Text>
                    
                </View>
                <View>
                <View style={styles.extraInfo}>

<View style={styles.info}>
    <Text style={{ fontSize: 22, color: 'white' }}>Minimum tempreture</Text>
    <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }}
/>
    <Text style={{ fontSize: 22, color: 'white' }}>{Math.floor(temp_min)} °C</Text>
</View>

<View style={styles.info}>
    <Text style={{ fontSize: 22, color: 'white' }}>Maximum tempreture</Text>
    <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }}
/>
    <Text style={{ fontSize: 22, color: 'white' }}>{Math.floor(temp_max)} °C</Text>
</View>

</View>

                <View style={styles.extraInfo}>

                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: 'white' }}>Humidity</Text>
                        <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1.5,
  }}
/>
                        <Text style={{ fontSize: 22, color: 'white' }}>{humidity} %</Text>
                    </View>

                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: 'white' }}>Wind Speed</Text>
                        <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1.5,
  }}
/>
                        <Text style={{ fontSize: 22, color: 'white' }}>{Math.floor((speed*3600)/1000)} km/hr</Text>
                    </View >
                
                </View></View>
                <View style={styles.extraInfo}>

                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: 'white' }}>Cloud cover</Text>
                        <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  }}
/>
                        <Text style={{ fontSize: 22, color: 'white' }}>{all} %</Text>
                    </View>

                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: 'white' }}>visibility</Text>
                        <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  }}
/>
                        <Text style={{ fontSize: 22, color: 'white' }}>{visibility/1000} km </Text>
                    </View>
                
                </View>
                

            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    backgroundImg: {
        flex: 1,
        width: Dimensions.get('screen').width
    },
    headerText: {
        fontSize: 36,
        marginTop: 10,
    },
    extraInfo: {
        flexDirection:"row-reverse",
        marginTop: 20,
        justifyContent:"space-around",
        
        
        padding: 10,
        
        
        
        
    },
    info: {
        width: Dimensions.get('screen').width/2.5,
        backgroundColor: 'rgba(255,0,0, 0.5)',
        padding: 10,
        borderRadius: 15,
       
        justifyContent: 'center',
        
        
    }
});
  
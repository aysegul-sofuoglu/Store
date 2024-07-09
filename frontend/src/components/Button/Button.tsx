import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = ({text, onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.title}>{text}</Text>
        </TouchableOpacity>
    )
}

export default Button;

const styles = StyleSheet.create({
    container:{
        padding: 8,
        margin: 10,
        backgroundColor: '#64b5f6',
        borderRadius: 5,
        alignItems: 'center'
    },
    title:{
        fontWeight: 'bold',
        fontSize: 17,
        color: 'white'
    }
})
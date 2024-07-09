import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../../utils/colors'
import { useNavigation } from '@react-navigation/native';

export default function StartScreen() {

    const navigation = useNavigation();

    const onSelectLogin = () => {
        navigation.navigate('LoginPage');
      };

      const onSelectRegister = () => {
        navigation.navigate('RegisterPage');
      };



  return (
    <SafeAreaView style={styles.container}>
        <View style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 24,
            paddingVertical: 12,
        }
        }>
        <View style= {{gap: 26, marginTop: 36}}>
            <Text style={styles.heading}>Welcome</Text>
        </View>

        <View style = {styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => onSelectLogin()}>
                <Text style={styles.buttonTittle}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => onSelectRegister()}>
                <Text style={styles.buttonTittle}>Create Account</Text>
            </TouchableOpacity>
        </View>
        </View>
        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
      
    },
    heading: {
        color: colors.primary,
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'column',
        marginBottom: 36,
        width: '100%',
        gap: 28,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
      },
      buttonTittle: {
        color: '#FFFFFF',
        fontSize: 16,
        textTransform: 'uppercase',
      },
})
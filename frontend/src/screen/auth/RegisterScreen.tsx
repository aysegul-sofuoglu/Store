import React from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';


const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Geçersiz email adresi')  
    .required('Email zorunludur'), 
  password: Yup.string()
    .min(4, 'Şifre en az 4 karakter olmalıdır')  
    .required('Şifre zorunludur') 
    
});

export default function RegisterScreen() {
  const navigation = useNavigation();

  const handleRegister = async (values) => {
    try {
      const response = await fetch('http://10.0.2.2:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const json = await response.json();

      if (response.ok) {
        Alert.alert('Başarılı', json.message || 'Kayıt başarılı');
        
        navigation.navigate('LoginPage');
      } else {
        Alert.alert('Hata', json.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Hata', 'Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo_container}>
        <Text style={styles.logo}>Mağaza</Text>
      </View>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={RegisterSchema}
        onSubmit={handleRegister}>
        {({handleSubmit, handleChange, values, errors, touched}) => (
          <View style={styles.body_container}>
            <Input
              placeholder="Mail adresinizi giriniz.."
              value={values.email}
              onChangeText={handleChange('email')}
              error={touched.email && errors.email}
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            <Input
              placeholder="Şifrenizi giriniz.."
              value={values.password}
              onChangeText={handleChange('password')}
              secureTextEntry
              
              error={touched.password && errors.password}
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            <Button text="Kayıt Ol" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  logo_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  body_container: {
    flex: 2,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginVertical: 4,
  },
});

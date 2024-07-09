import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableWithoutFeedback,

} from 'react-native';

interface Product {
  _id: number;
  name: string;
  description: string;
  price: string;
}

type ProductsScreenNavigationProp = NativeStackNavigationProp<any, 'Products'>; 

type Props = {
  navigation: ProductsScreenNavigationProp; 
};


export const Products: React.FC<Props> = ({navigation}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://10.0.2.2:3000/products/get-all')
      .then(resp => resp.json()) 
      .then(json => setProducts(json.products))
      .catch(error => console.error('Fetch error:', error))
      .finally(() => setLoading(false));
  }, []);


  const onSelect = (item: Product) => {
    navigation.navigate('DetailPage', { product: item });
  };



  return (
    <View style={{width: '90%'}}>
      {loading ? (
        <ActivityIndicator size="large" color="#0D66FF" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) => (
            <TouchableWithoutFeedback onPress={() => onSelect(item)}>
            <View style={styles.container}>
              <View style={styles.body_container}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>{item.price} TL</Text>
              </View>
            </View>
            </TouchableWithoutFeedback>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#bdbdbd',
    
    margin: 10,
    backgroundColor: '#EAEAEA',
    flexDirection: 'row',
  },
  body_container: {
    padding: 5,
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  description: {
    textAlign: 'left',
    fontSize: 12,
    fontStyle: 'italic',
  },
  price: {
    textAlign: 'right',
    fontSize: 12,
    fontStyle: 'italic',
  },
});

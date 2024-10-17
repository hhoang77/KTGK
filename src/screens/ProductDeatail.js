import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';

const ProductDetail = ({route, navigation}) => {
  const {productId} = route.params;
  console.log(productId);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(
          `http://10.60.54.4:3007/update?id=${productId}`,
        );
        setName(response.data.name);
        setPrice(response.data.price);
        setCategoryId(response.data.categoryId);
      } catch (error) {
        console.error('Error fetching product detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://10.60.54.4:3007/update?id=${productId}`,
        {name, price, categoryId}, // Truyền ba trường riêng biệt
      );
      if (response.status === 200) {
        Alert.alert('Cập nhật thành công!');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error updating product:', error);
      Alert.alert('Cập nhật thất bại!', error.message);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cập nhật sản phẩm</Text>

      <TextInput
        style={styles.input}
        placeholder="Tên sản phẩm"
        value={name}
        onChangeText={setName} // Cập nhật state name
      />

      <TextInput
        style={styles.input}
        placeholder="Giá sản phẩm"
        value={price}
        onChangeText={setPrice} // Cập nhật state price
        keyboardType="numeric" // Hiển thị bàn phím số
      />

      <TextInput
        style={styles.input}
        placeholder="ID danh mục"
        value={categoryId}
        onChangeText={setCategoryId} // Cập nhật state categoryId
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Cập nhật</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  button: {
    padding: 15,
    backgroundColor: '#28a745',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetail;

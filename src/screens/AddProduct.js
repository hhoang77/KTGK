import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

function AddProduct({navigation}) {
  // Thêm navigation vào tham số
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [categoryId, setCategoryId] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleAddProduct = async () => {
    if (!productName || !productPrice || !productImage || !categoryId) {
      Alert.alert('Error', 'Vui lòng điền đầy đủ thông tin sản phẩm!');
      return;
    }

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('price', productPrice);
    formData.append('image', {
      uri: productImage,
      type: 'image/jpeg',
      name: 'product-image.jpg',
    });
    formData.append('categoryId', categoryId);

    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        'http://192.168.1.8:3007/product/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('Thêm sản phẩm thành công:', response.data);
      Alert.alert('Thành công', 'Sản phẩm đã được thêm!');

      setProductName('');
      setProductPrice('');
      setProductImage(null);
      setCategoryId('');
    } catch (error) {
      console.error('Error adding product:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi thêm sản phẩm.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleSelectImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri; // Lấy đường dẫn hình ảnh
        console.log('Selected image URI:', uri);
        setProductImage(uri); // Lưu đường dẫn vào trạng thái
      } else {
        console.log('No image selected');
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Nút Back ở góc trái */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Quay lại</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Thêm Sản Phẩm</Text>

      <TextInput
        style={styles.input}
        placeholder="Tên sản phẩm"
        value={productName}
        onChangeText={text => setProductName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Giá sản phẩm"
        value={productPrice}
        onChangeText={text => setProductPrice(text)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Category ID"
        value={categoryId}
        onChangeText={text => setCategoryId(text)}
      />

      <TouchableOpacity style={styles.imagePicker} onPress={handleSelectImage}>
        <Text style={styles.imagePickerText}>
          {productImage ? 'Hình ảnh đã chọn' : 'Chọn hình ảnh'}
        </Text>
      </TouchableOpacity>

      {productImage && (
        <Image source={{uri: productImage}} style={styles.imagePreview} />
      )}

      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Thêm sản phẩm</Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loadingIndicator}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  imagePicker: {
    width: '100%',
    padding: 15,
    backgroundColor: '#28a745',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePickerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 5,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#28a745',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  backButton: {
    position: 'absolute', // Đặt vị trí tuyệt đối
    top: 30, // Khoảng cách từ trên cùng
    left: 20, // Khoảng cách từ bên trái
    padding: 10,
    backgroundColor: '#FF5733', // Màu nền cho nút quay lại
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default AddProduct;

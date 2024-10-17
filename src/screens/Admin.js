import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Alert,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import axios from 'axios';

function Admin({navigation}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.60.54.4:3007/product', {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });

        setData(response.data.content);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async id => {
    console.log(id);

    try {
      await axios.delete(`http://10.60.54.4:3007/product/delete?id=${id}`);
      Alert.alert('Thành công', 'Sản phẩm đã được xóa');
      setData(data.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      Alert.alert('Lỗi', 'Không thể xóa sản phẩm');
    }
  };

  const handleEdit = product => {
    setCurrentProduct(product);
    setModalVisible(true);
  };

  const handleUpdate = async updatedProduct => {
    try {
      await axios.put(`http://10.60.54.4:3007/product/update`, updatedProduct);
      Alert.alert('Thành công', 'Sản phẩm đã được cập nhật');
      setData(
        data.map(item =>
          item._id === updatedProduct._id ? updatedProduct : item,
        ),
      );
      setModalVisible(false);
    } catch (error) {
      console.error('Error updating product:', error);
      Alert.alert('Lỗi', 'Không thể cập nhật sản phẩm');
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.wrapper}>
      <Image source={{uri: item.image}} style={styles.image} />
      <Text style={styles.text}>Tên Sản phẩm: {item.name}</Text>
      <Text style={styles.text}>Giá sản phẩm: {item.price}</Text>
      <Text style={styles.text}>Loại sản phẩm: {item.categoryId.name}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEdit(item)}>
          <Text style={styles.buttonText}>Cập nhật</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item._id)}>
          <Text style={styles.buttonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddProduct')}>
        <Text style={styles.buttonText}>Thêm sản phẩm</Text>
      </TouchableOpacity>

      {loading ? (
        <Text>Đang tải dữ liệu...</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      )}

      {currentProduct && (
        <UpdateProductModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          product={currentProduct}
          onUpdate={handleUpdate}
        />
      )}
    </View>
  );
}

const UpdateProductModal = ({visible, onClose, product, onUpdate}) => {
  const [name, setName] = useState(product?.name);
  const [price, setPrice] = useState(product?.price);

  const handleUpdate = () => {
    onUpdate({...product, name, price});
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{padding: 20}}>
        <TextInput
          placeholder="Tên sản phẩm"
          value={name}
          onChangeText={setName}
          style={{borderWidth: 1, marginBottom: 10, padding: 10}}
        />
        <TextInput
          placeholder="Giá sản phẩm"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={{borderWidth: 1, marginBottom: 10, padding: 10}}
        />
        <Button title="Cập nhật" onPress={handleUpdate} />
        <Button title="Đóng" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  wrapper: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default Admin;

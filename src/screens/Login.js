import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Trạng thái loading

  const handleLogin = async () => {
    setLoading(true); // Bắt đầu loading
    try {
      const response = await axios.post('http://192.168.1.8:3007/user/login', {
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Đăng nhập thành công', response.data);
        const userRole = response.data.content.role; // Lấy vai trò người dùng

        // Điều hướng dựa trên vai trò
        if (userRole === 'admin') {
          navigation.navigate('Admin'); // Điều hướng đến Admin
        } else {
          navigation.navigate('Home'); // Điều hướng đến Home
        }
      }
    } catch (error) {
      console.error(
        'Đăng nhập thất bại:',
        error.response ? error.response.data : error.message,
      );
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address" // Hiển thị bàn phím với @ và .com
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true} // Ẩn password khi nhập
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#28a745',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;

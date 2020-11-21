import axios from 'axios';
import { AsyncStorage } from 'react-native';
const api = axios.create({
  baseURL: 'http://192.168.0.118:3333'

});
api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('@Reminder:token');
    const idUser = await AsyncStorage.getItem('@Reminder:userId');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (idUser) {
      config.headers.UserId = `${idUser}`;
    }

    return config;
  } catch (err) {
    alert('Token is missing');
  }
});
export default api;
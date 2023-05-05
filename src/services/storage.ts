import AsyncStorage from '@react-native-async-storage/async-storage';

// storeToken
export const storeToken = async (value: string) => {
    try {
        await AsyncStorage.setItem('token', value);
    } catch (error) {
        console.log(error);
    }
}

// getToken
export const getToken = async () => {
    try {
        return await AsyncStorage.getItem('token');
    } catch (error) {
        console.log(error);
    }
}

export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem('token');
    } catch (error) {
        console.log(error);
    }
}
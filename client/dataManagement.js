import AsyncStorage from '@react-native-community/async-storage';

module.exports.getItem = async (key) => {
    const value = await AsyncStorage.getItem('TOKEN')
    if (value === null){
        return Promise.reject()
    }
    return Promise.resolve(value)
}

module.exports.getJSON = async (key) => {
    const value = await AsyncStorage.getItem('TOKEN')
    if (value === null){
        return Promise.reject()
    }
    return Promise.resolve(JSON.parse(value))
}

module.exports.storeJSON = async (key, value) => {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
}

module.exports.storeItem = async (key, value) => {
    await AsyncStorage.setItem(key, value)
}
import { MMKV } from 'react-native-mmkv'; // Import the MMKV module for storing data efficiently
import stringifySafe from 'json-stringify-safe'; // Import a library for safely stringifying objects
import isObject from 'lodash/isObject'; // Import a utility function to check if a value is an object

export const storage = new MMKV({ // Create a new instance of MMKV for storing data
    id: `TodoList-storage`, // Set an ID for the storage
    encryptionKey: 'hunter2' // Set an encryption key for the storage (optional)
});

export const setStorage = (key, value) => {
    const serializedValue = isObject(value) ? stringifySafe(value) : value; // Serialize the value if it is an object
    storage.set(key, serializedValue); // Store the serialized value in the MMKV storage
};
// Get the value from the MMKV storage
export const getStorage = (key, type = 'string') => {
    let value;
    switch (type) {
        case 'number':
            value = storage.getNumber(key);
            break;
        case 'boolean':
            value = storage.getBoolean(key);
            break;
        default:
            value = storage.getString(key);
            break;
    }
    if (value !== null && value !== undefined) {
        return type === 'object' ? JSON.parse(value) : value;
    }
};

export const hasStorageKey = key => storage.contains(key);

export const getStorageAllKeys = () => storage.getAllKeys();

export const deleteStorage = key => storage.delete(key);

export const clearAllStorage = () => storage.clearAll();

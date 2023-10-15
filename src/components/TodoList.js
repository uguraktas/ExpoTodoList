import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Input, Button, ListItem } from '@rneui/themed'; 
import { useApp } from '../contexts/AppContext';

const TodoList = () => {
    const [text, setText] = useState(''); // State variable to store the text input value
    const [editingId, setEditingId] = useState(null); // State variable to store the ID of the todo being edited
    const { getTodosData, addTodo, updateTodo, deleteTodo  } = useApp(); // Access the necessary methods from the app context
   
    const handleUpdate = () => {
        if (!text) {
            return;
        }
        updateTodo(editingId, text); // Call the updateTodo method from the app context to update the todo with the specified ID
        setEditingId(null); // Clear the editing ID
        setText(''); // Clear the text input value
    };

    const handleDeleteTodo = (id) => {
        Alert.alert(
            "Delete Todo",
            "Are you sure you want to delete this todo?",
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => deleteTodo(id) // Call the deleteTodo method from the app context to delete the todo with the specified ID
                }
            ],
            { cancelable: false }
        );
    };
    const handleAddTodo = () => {
        if (!text) {
            return;
        }
        addTodo(text); // Call the addTodo method from the app context to add a new todo with the specified text
        setText(''); // Clear the text input value
    }

    const renderAddButton = () => {
        if (editingId) { // If there is an editing ID, display an update button
            return (
                <Button title="Update Todo" onPress={handleUpdate} />
            );
        }
        if (!editingId) { // If there is no editing ID, display an add button
            return (
                <Button title="Add Todo" onPress={handleAddTodo} />
            );
        }
    }

    return (
        <View style={styles.container}>
            <Input
                value={text}
                onChangeText={setText}
                placeholder="Add a todo"
            /> 
            {renderAddButton()} 
            <FlatList
                data={getTodosData} // Pass in the todos data from the app context
                keyExtractor={item => item.id.toString()} // Specify a unique key for each todo item
                renderItem={({ item }) => {
                    return(
                    <ListItem bottomDivider> 
                        <ListItem.Content>
                            <ListItem.Title>{item.text}</ListItem.Title> 
                        </ListItem.Content>
                        <Button title="Delete" onPress={() => handleDeleteTodo(item.id)} /> 
                        <Button title="Edit" onPress={() => {
                            setText(item.text); // Set the text input value to the current text of the todo item
                            setEditingId(item.id); // Set the editing ID to the ID of the todo item being edited
                        }} /> 
                    </ListItem>
                )}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});

export default TodoList;

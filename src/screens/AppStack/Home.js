import React from 'react';
import { View } from 'react-native'
import TodoList from '../../components/TodoList';
import { Button } from '@rneui/themed';
import { useApp } from '../../contexts/AppContext';

const Home = ({ navigation }) => {
    const { setUserData } = useApp();

    const logout = () => {
        setUserData(false);
    };

    return (
        <View style={{ flex: 1 }}>
            <TodoList />
            <Button title="Logout" onPress={logout} />
        </View>
    );
};

export default Home;

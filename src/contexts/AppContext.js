import React, { createContext, useContext, useEffect, useState } from "react";
import { setStorage, getStorage } from '../helpers/common'; 
import { isUndefined } from "lodash";

const AppContext = createContext(); // Create a new context object

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false); // State variable to track loading state
  const [todosData, setTodosData] = useState([]); // State variable to store todo data
  const [userData, setUserData] = useState(false); // State variable to store user data

  useEffect(() => {
    runLocalStorage() // Run local storage function on component mount
  }, [])

  const runLocalStorage = async () => {
    try {
      const todosData = await getStorage(`todosData`, 'object') // Get todos data from local storage
      const userData = await getStorage(`userData`, 'boolean') // Get user data from local storage

      setTodosData(!isUndefined(todosData) ? todosData : []); // Set todos data in state, or an empty array if it is undefined

      setUserData(!isUndefined(userData) ? userData : false) // Set user data in state, or false if it is undefined
    } catch (error) {
      console.error('ERROR-runLocalStorage-app', error) // Log any errors during local storage retrieval
    } finally {
      setLoading(false) // Set loading state to false, indicating that data retrieval is complete
    }
  }

  const providerMethods = {
    loading,
    setLoading,
    getTodosData: todosData, // Expose todos data to other components
    addTodo: (text) => {
      const newTodo = { id: Math.random(), text };
      setTodosData([...todosData, newTodo]); // Add a new todo to the todos data
      setStorage(`todosData`, [...todosData, newTodo]); // Store the updated todos data in local storage
    },
    deleteTodo: (id) => {
      const updatedTodos = todosData.filter(todo => todo.id !== id); // Filter out the todo with the specified id
      setTodosData(updatedTodos); // Update the todos data in state
      setStorage(`todosData`, updatedTodos); // Store the updated todos data in local storage
    },
    updateTodo: (id, newText) => {
      const updatedTodos = todosData.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      ); // Update the text of the todo with the specified id
      setTodosData(updatedTodos); // Update the todos data in state
      setStorage(`todosData`, updatedTodos); // Store the updated todos data in local storage
    },
    getUserData: userData, // Expose user data to other components
    setUserData: (data) => {
      setUserData(data); // Set the user data in state
      setStorage(`userData`, data); // Store the user data in local storage
    },
  };

  return <AppContext.Provider value={providerMethods}>{children}</AppContext.Provider>
};

export const useApp = () => useContext(AppContext); 

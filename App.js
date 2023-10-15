import React from 'react';
import { SafeAreaView } from 'react-native';
import { AppProvider } from './src/contexts/AppContext';

import { ThemeProvider } from '@rneui/themed';
import { theme } from './src/theme';
import RootNavigator from './src/navigation/RootNavigator';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <AppProvider>
          <RootNavigator/>
        </AppProvider>
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default App;

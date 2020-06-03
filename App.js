import 'react-native-gesture-handler';
import React, { useReducer, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Categories from './components/Categories';
import Items from './components/Items';
import ItemShow from './components/ItemShow';
import Navbar from './components/Navbar';
import Scanner from './components/Scanner';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './components/RootNavigation';
import * as Permissions from 'expo-permissions';

import {
  CategoryContext, 
  categoriesReducer,
  categoryState,
} from './context/categoriesReducer';
import {
  ItemContext,
  itemsReducer,
  itemState,
} from './context/itemsReducer';

const Stack = createStackNavigator();

export default function App() {
  const [categories, dispatchCategories] = useReducer(
    categoriesReducer,
    categoryState,
  );
  
  const [items, dispatchToItems] = useReducer(
    itemsReducer, 
    itemState,
  );

  async function getCameraPermission() {
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      console.log('hit granted access')
    } else {
      throw new Error('Camera permission not granted');
    }
  }

  useEffect(() => {
    getCameraPermission();
  }, [])

  return (
    <NavigationContainer ref={navigationRef} >
      <CategoryContext.Provider value={[categories, dispatchCategories]}>
        <ItemContext.Provider value={[items, dispatchCategories]}>
          <Stack.Navigator>
            <Stack.Screen
              name='Categories'
              component={Categories}
            />
            <Stack.Screen
              name='Items'
              component={Items}
            />
            <Stack.Screen
              name='ItemShow'
              component={ItemShow}
            />
            <Stack.Screen
              name='Scanner'
              component={Scanner}
            />
          </Stack.Navigator>
          <Navbar />
          {/* <Categories /> */}
        </ItemContext.Provider>
      </CategoryContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

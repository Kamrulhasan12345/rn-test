import * as React from 'react';
import { Alert, Button, Pressable, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import NotesList from './screens/notes-list';
import NoteDetails from './screens/note-details';
import Ionicons from '@react-native-vector-icons/ionicons';

type RootStackParamList = {
  Notes: undefined;
  NoteDetail: { id: number }
};

type Props = NativeStackScreenProps<RootStackParamList, 'NoteDetail'>;

export type NoteDetailNavigationProp = Props['navigation']

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator>
          <Stack.Screen
            name='Notes'
            component={NotesList}
            options={{
              headerRight: () => <Pressable onPress={() => Alert.alert('Created!')} style={styles.iconButton}>
                <Ionicons name='add' size={24} color='#fff' />
              </Pressable>
            }}
          />
          <Stack.Screen name='NoteDetail' component={NoteDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    padding: 8
  },
});
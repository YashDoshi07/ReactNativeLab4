import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CabList from './Components/CabList';
import BookedCabs from './Components/BookedCab';
import { Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const App = () => {
  const [bookings, setBookings] = useState([]);

  const addBooking = (cab) => {
    const isBooked = bookings.find(booking => booking.id === cab.id);
    if (isBooked) {
      Alert.alert('This cab is already booked.');
      return false;
    }
    if (bookings.length >= 2) {
      Alert.alert('Limit Exceeded', 'You’ve reached the maximum limit of 2 cab bookings.');
      return false;
    }
    setBookings([...bookings, cab]);
    return true;
  };

  const cancelBooking = (cabId) => {
    setBookings(bookings.filter(booking => booking.id !== cabId));
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Cabs') {
              iconName = 'car-sport';
            } else if (route.name === 'Bookings') {
              iconName = 'list';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#e91e63',
          inactiveTintColor: '#8e8e8e',
          style: {
            backgroundColor: '#ffffff',
            borderTopWidth: 0,
            elevation: 2,
          },
        }}
      >
        <Tab.Screen name="Cabs" options={{ headerShown: false }}>
          {(props) => <CabList {...props} addBooking={addBooking} />}
        </Tab.Screen>
        <Tab.Screen name="Bookings">
          {(props) => <BookedCabs {...props} bookings={bookings} cancelBooking={cancelBooking} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
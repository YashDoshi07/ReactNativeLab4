import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { getDocs, getFirestore, collection } from 'firebase/firestore';
import { app } from './firebaseConfig';
import CabInfo from './CabInfo';
import Icon from 'react-native-vector-icons/Ionicons';

const companyColors = {
  'CanadaCabs': '#FFD700',
  'OntarioCabs': '#32CD32',
  'LondonCabs': '#FF6347',
  'TorontoCabs': '#79BAEC',
};

const Stack = createStackNavigator();
const db = getFirestore(app);
const cabRef = collection(db, 'cabList');

const CabsList = ({ addBooking }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cab List" component={HomeScreen} />
      <Stack.Screen name="Cab Details">
        {(props) => <CabInfo {...props} addBooking={addBooking} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const HomeScreen = ({ navigation }) => {
  const [cabs, setCabs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(cabRef);
        const cabList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCabs(cabList);
      } catch (error) {
        console.error('Error :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#e91e63" />;

  if (cabs.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No data found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cabs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Cab Details', { car: item })}
          >
            <View style={styles.iconContainer}>
              <Icon
                name="car-sport"
                size={50}
                color={companyColors[item.Company] || '#000'}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.company}>{item.Company}</Text>
              <Text style={styles.model}>{item.Model}</Text>
              <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                  <Icon name="people" size={20} color="#123456" />
                  <Text style={styles.detail}> {item.Passengers}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Icon name="star" size={20} color="#FFD700" />
                  <Text style={styles.detail}> {item.Rating}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Icon name="cash" size={20} color="#85BB65" />
                  <Text style={styles.detail}> ${item.Cost}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  iconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  company: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  model: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detail: {
    fontSize: 16,
    color: '#777',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
});

export default CabsList;
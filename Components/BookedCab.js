import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BookedCabs = ({ bookings, cancelBooking }) => {
  return (
    <View style={styles.container}>
      {bookings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>It looks like you don't have any bookings yet.</Text>
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                <Icon
                  name="car-sport"
                  size={80}
                  color={companyColors[item.Company] || '#000'}
                />
              </View>
              <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Company:</Text>
                  <Text style={styles.info}>{item.Company}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Model:</Text>
                  <Text style={styles.info}>{item.Model}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Passengers:</Text>
                  <Text style={styles.info}>{item.Passengers}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Rating:</Text>
                  <Text style={styles.info}>{item.Rating}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Cost:</Text>
                  <Text style={styles.info}>${item.Cost}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => cancelBooking(item.id)}
              >
                <Icon name="trash-outline" size={24} color="#ff4d4d" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const companyColors = {
  'CanadaCabs': '#FFD700',
  'OntarioCabs': '#32CD32',
  'LondonCabs': '#FF6347',
  'TorontoCabs': '#79BAEC',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    position: 'relative',
  },
  iconContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    width: 120,
  },
  info: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'transparent',
    borderRadius: 0,
    elevation: 0,
    padding: 0,
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

export default BookedCabs;

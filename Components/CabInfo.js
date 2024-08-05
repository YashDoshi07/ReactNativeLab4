import React from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';

const CabInfo = ({ route, navigation, addBooking }) => {
  const { car } = route.params;

  const manageBookings = () => {
    const success = addBooking(car);
    if (success) {
      Alert.alert('Cab Booked!', `Your booking for ${car.Company} ${car.Model} has been confirmed.`);
      navigation.goBack();
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <DetailRow label="Cab Company:" value={car.Company} />
        <DetailRow label="Car Model:" value={car.Model} />
        <DetailRow label="Max Passengers:" value={car.Passengers} />
        <DetailRow label="Rating:" value={car.Rating} />
        <DetailRow label="Cost:" value={`$${car.Cost}`} />
      </View>
      <TouchableOpacity style={styles.button} onPress={manageBookings}>
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    color: '#333',
  },
  detailsContainer: {
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    paddingHorizontal: 16,
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: '#85BB65',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CabInfo;

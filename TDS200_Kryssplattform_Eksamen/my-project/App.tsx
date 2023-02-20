import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import SleepRegistrationScreen from "./SleepRegistrationScreen";

export default function App() {
  const [hoursSlept, setHoursSlept] = useState('');
  const [quality, setQuality] = useState('');
  const [sleepData, setSleepData] = useState([]);

  const addSleepData = () => {
    const newSleepData = { hoursSlept, quality };
    setSleepData([...sleepData, newSleepData]);
    setHoursSlept('');
    setQuality('');
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Sleep Tracker</Text>

        <View style={styles.inputContainer}>
          <SleepRegistrationScreen/>
          <TextInput
              style={styles.input}
              placeholder="Hours slept"
              keyboardType="numeric"
              value={hoursSlept}
              onChangeText={setHoursSlept}
          />
          <TextInput
              style={styles.input}
              placeholder="Quality (1-10)"
              keyboardType="numeric"
              value={quality}
              onChangeText={setQuality}
          />
          <TouchableOpacity style={styles.button} onPress={addSleepData}>
            <Text style={styles.buttonText}>Add Data</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sleepDataContainer}>
          <Text style={styles.sleepDataTitle}>Sleep Data:</Text>
          {sleepData.map((data, index) => (
              <View key={index} style={styles.sleepDataItem}>
                <Text>Hours: {data.hoursSlept}</Text>
                <Text>Quality: {data.quality}</Text>
              </View>
          ))}
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#008CBA',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sleepDataContainer: {
    width: '80%',
  },
  sleepDataTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sleepDataItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

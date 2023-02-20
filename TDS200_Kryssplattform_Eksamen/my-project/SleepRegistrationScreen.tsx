import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function SleepRegistrationScreen() {
    const [selectedDate, setSelectedDate] = useState('');

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Sleep Registration</Text>
            <Calendar
                markedDates={{ [selectedDate]: { selected: true } }}
                onDayPress={handleDayPress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});
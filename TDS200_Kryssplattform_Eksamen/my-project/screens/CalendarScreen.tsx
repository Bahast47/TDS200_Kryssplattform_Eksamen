import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CalendarList, DateObject } from 'react-native-calendars';
import { StackNavigationProp } from '@react-navigation/stack';
import { SleepData } from '../types';

type CalendarScreenProps = {
    navigation: StackNavigationProp<any>;
};

const CalendarScreen = ({ navigation }: CalendarScreenProps) => {
    const [selectedDate, setSelectedDate] = useState<DateObject | null>(null);
    const [sleepData, setSleepData] = useState<SleepData[]>([]);

    const onDayPress = (day: DateObject) => {
        setSelectedDate(day);
    };

    const onSubmitSleepData = (hours: number) => {
        if (selectedDate) {
            const dateStr = selectedDate.dateString;
            const existingDataIndex = sleepData.findIndex((data) => data.date === dateStr);
            if (existingDataIndex === -1) {
                setSleepData([...sleepData, { date: dateStr, hours }]);
            } else {
                const newData = [...sleepData];
                newData[existingDataIndex].hours = hours;
                setSleepData(newData);
            }
        }
    };

    const renderSleepData = (dateStr: string) => {
        const data = sleepData.find((item) => item.date === dateStr);
        if (data) {
            return <Text style={styles.sleepDataText}>{`${data.hours} hours`}</Text>;
        }
        return null;
    };



    return (
        <View style={styles.container}>
            <CalendarList onDayPress={onDayPress} markedDates={{ [selectedDate?.dateString!]: { selected: true } }} />
            {selectedDate && (
                <View style={styles.formContainer}>
                    <Text style={styles.formTitle}>{`Sleep data for ${selectedDate.dateString}`}</Text>
                    <TouchableOpacity onPress={() => onSubmitSleepData(4)}>
                        <Text style={styles.formButton}>4 hours</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onSubmitSleepData(6)}>
                        <Text style={styles.formButton}>6 hours</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onSubmitSleepData(8)}>
                        <Text style={styles.formButton}>8 hours</Text>
                    </TouchableOpacity>
                    {renderSleepData(selectedDate.dateString)}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 50,
    },
    formContainer: {
        marginTop: 20,
        padding: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ccc',
    },
    formTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    formButton: {
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
    },
    sleepDataText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CalendarScreen;

import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Calendar, DateObject } from 'react-native-calendars';

interface DayProps {
    date: DateObject;
    state: 'disabled' | 'today' | '';
    onPress: (date: DateObject) => void;
}

const Day = ({ date, state, onPress }: DayProps) => {
    return (
        <TouchableOpacity onPress={() => onPress(date)}>
            <View
                style={[
                    styles.dayContainer,
                    state === 'disabled' && styles.disabledDayContainer,
                    state === 'today' && styles.todayContainer,
                ]}
            >
                <Text
                    style={[
                        styles.day,
                        state === 'disabled' && styles.disabledDay,
                        state === 'today' && styles.todayText,
                    ]}
                >
                    {date.day}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const MyCalendar = () => {
    const [selectedDate, setSelectedDate] = useState<DateObject>();
    const { width } = Dimensions.get('window');

    const onDayPress = (day: DateObject) => {
        setSelectedDate(day);
    };

    return (
        <View style={styles.container}>
            <Calendar
                onDayPress={onDayPress}
                dayComponent={({ date, state }) => (
                    <Day date={date} state={state} onPress={onDayPress} />
                )}
                style={{ width }}
                theme={{
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: 'orange',
                    monthTextColor: 'blue',
                }}
            />
            {selectedDate && (
                <View>
                    <Text>Selected date: {selectedDate.dateString}</Text>
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
        justifyContent: 'center',
    },
    dayContainer: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5, // change from 16 to 5
        borderWidth: 1,
        borderColor: '#CCC',
    },
    todayContainer: {
        borderColor: 'blue',
        borderWidth: 2,
    },
    disabledDayContainer: {
        opacity: 0.5,
    },
    day: {
        fontSize: 14,
        color: '#000',
    },
    todayText: {
        color: 'blue',
    },
    disabledDay: {
        color: '#CCC',
    },
});

export default MyCalendar;

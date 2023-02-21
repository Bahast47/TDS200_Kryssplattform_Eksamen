import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';

interface SleepData {
    date: string;
    hoursSlept: number;
    inputText: string[];
}

const SleepTracker = () => {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [sleepData, setSleepData] = useState<SleepData[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);

    const handleRegisterSleep = () => {
        if (sleepData.some(data => data.date === selectedDate)) {
            alert('Sleep data already registered for this date.');
        } else {
            const newSleepData = {date: selectedDate, hoursSlept: 0, inputText: new Array(10).fill('')};
            setSleepData([...sleepData, newSleepData]);
            setEditMode(true);
        }
    };

    const handleInputChange = (index: number, text: string) => {
        const updatedSleepData = sleepData.map(sleep => {
            if (sleep.date === selectedDate) {
                const updatedInputText = [...sleep.inputText];
                updatedInputText[index] = text;
                return {...sleep, inputText: updatedInputText};
            }
            return sleep;
        });
        setSleepData(updatedSleepData);
    };

    const handleSubmit = () => {
        if (submitted) {
            alert('You have already submitted your responses for this date.');
        } else {
            setSubmitted(true);
            setEditMode(false);
        }
    };

    const handleEdit = () => {
        setEditMode(true);
    }

    const handleDateSelect = (date: any) => {
        setSelectedDate(date.dateString);
    };

    return (
        <View>
            <Calendar
                onDayPress={handleDateSelect}
                markedDates={{ [selectedDate]: { selected: true } }}
            />
            {selectedDate ? (
                <>
                    <Text>Selected Date: {selectedDate}</Text>
                    {submitted ? (
                        <View>
                            <Text>Responses:</Text>
                            {sleepData
                                .find((data) => data.date === selectedDate)
                                ?.inputText.map((text, index) => (
                                    <Text key={index.toString()}>{text}</Text>
                                ))}
                            <Button title="Edit" onPress={() => setSubmitted(false)} />
                        </View>
                    ) : (
                        <View>
                            <Button
                                title="Register Sleep"
                                onPress={handleRegisterSleep}
                                disabled={submitted}
                            />
                            <View>
                                {sleepData.map((sleep) => {
                                    if (sleep.date === selectedDate) {
                                        return sleep.inputText.map((text, index) => (
                                            <TextInput
                                                key={index.toString()}
                                                style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
                                                placeholder={`Enter text ${index}`}
                                                value={text}
                                                onChangeText={(newText: string) =>
                                                    handleInputChange(index, newText)
                                                }
                                                editable={!submitted}
                                            />
                                        ));
                                    }
                                    return null;
                                })}
                            </View>
                            <Button
                                title="Submit"
                                onPress={handleSubmit}
                                disabled={submitted}
                            />
                        </View>
                    )}
                </>
            ) : null}
        </View>
    );
};

export default SleepTracker;

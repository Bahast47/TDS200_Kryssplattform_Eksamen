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
        if (sleepData.some((data) => data.date === selectedDate)) {
            alert('Sleep data already registered for this date.');
        } else {
            const newSleepData = { date: selectedDate, hoursSlept: 0, inputText: new Array(5).fill('') };
            setSleepData([...sleepData, newSleepData]);
            if (!submitted) {
                setEditMode(true);
            }
        }
    };

    const handleInputChange = (index: number, text: string) => {
        const updatedSleepData = sleepData.map((sleep) => {
            if (sleep.date === selectedDate) {
                const updatedInputText = [...sleep.inputText];
                updatedInputText[index] = text;
                return { ...sleep, inputText: updatedInputText };
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
    };

    const handleDateSelect = (date: any) => {
        setSelectedDate(date.dateString);
        setEditMode(false);
    };

    const handleEditSleepData = (date: string) => {
        setSelectedDate(date);
        setEditMode(true);
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
                                        return (
                                            <View key={sleep.date}>

                                                {sleep.inputText.slice(1).map((text, index) => (
                                                    <TextInput
                                                        key={index.toString()}
                                                        style={{ borderWidth: 1, padding: 10, marginVertical: 10, marginHorizontal: 15 }}
                                                        placeholder={index === 0 ? 'Title' : index === 1 ? 'Time the user went to bed' : index === 2 ? 'Time for when the user woke up' : 'Sleep quality'}
                                                        value={sleep.inputText[index]}
                                                        onChangeText={(newText: string) => handleInputChange(index, newText)}
                                                        editable={!submitted}
                                                    />
                                                ))}
                                            </View>
                                        );
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
            <Text style={{fontWeight: 'bold', marginVertical: 10}}>Sleep Data:</Text>
            <View>
                {sleepData.map((data) => (
                    <View key={data.date}>
                        <Text style={{fontWeight: 'bold'}}>
                            {data.date}
                            <Button title="Edit" onPress={() => setEditMode(true)} />
                        </Text>
                        <Text>{`Title: ${data.inputText[0]}`}</Text>
                        <Text>{`Time the user went to bed: ${data.inputText[1]}`}</Text>
                        <Text>{`Time for when the user woke up: ${data.inputText[2]}`}</Text>
                        <Text>{`Sleep quality: ${data.hoursSlept}`}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};






export default SleepTracker;

// Import necessary modules
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the SleepData interface
interface SleepData {
    date: string;
    inputText: string[];
}

// Define the SleepTracker component
const SleepTracker = () => {
    // Define the state variables using the useState hook
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [sleepData, setSleepData] = useState<SleepData[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);

    // Use the useEffect hook to retrieve the sleepData from AsyncStorage on component mount
    useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('sleepData');
                if (value !== null) {
                    setSleepData(JSON.parse(value));
                }
            } catch (e) {
                console.log('Error reading sleepData from AsyncStorage:', e);
            }
        };
        getData();
    }, []);

    // Use the useEffect hook to save the sleepData to AsyncStorage on every update
    useEffect(() => {
        const storeData = async () => {
            try {
                await AsyncStorage.setItem('sleepData', JSON.stringify(sleepData));
            } catch (e) {
                console.log('Error saving sleepData to AsyncStorage:', e);
            }
        };
        storeData();
    }, [sleepData]);

    // Define the handleRegisterSleep function to add a new entry to the sleepData array
    const handleRegisterSleep = () => {
        if (sleepData.some((data) => data.date === selectedDate)) {
            alert('Sleep data already registered for this date.');
        } else {
            const newSleepData = {date: selectedDate, inputText: new Array(6).fill('')};
            setSleepData([...sleepData, newSleepData]);
        }
    };

    // Define the handleInputChange function to update the inputText field of a sleepData entry
    const handleInputChange = (index: number, text: string) => {
        const updatedSleepData = sleepData.map((sleep) => {
            if (sleep.date === selectedDate) {
                const updatedInputText = [...sleep.inputText];
                updatedInputText[index] = text;
                return {...sleep, inputText: updatedInputText};
            }
            return sleep;
        });
        setSleepData(updatedSleepData);
    };

    // Define the handleSubmit function to submit the sleepData for the selected date
    const handleSubmit = () => {
        if (submitted) {
            alert('You have already submitted your responses for this date.');
        } else {
            setSubmitted(true);
        }
    };

    // Define the handleDateSelect function to update the selected date in the state
    const handleDateSelect = (date: any) => {
        setSelectedDate(date.dateString);
        setSubmitted(false);
    };

    // Define the handleDeleteSleepData function to delete a sleepData entry
    const handleDeleteSleepData = (date: string) => {
        const updatedSleepData = sleepData.filter((data) => data.date !== date);
        setSleepData(updatedSleepData);
    };

// Return the JSX for the SleepTracker component

    return (
        <View>
            {/* Calendar component to select date */}
            <Calendar
                onDayPress={handleDateSelect}
                markedDates={{[selectedDate]: {selected: true}}}
            />

            {/* Display selected date and sleep data input fields */}
            {selectedDate ? (
                <>
                    <Text>Selected Date: {selectedDate}</Text>
                    {submitted ? ( // If form has been submitted, show response data

                        <View>
                            <Text>Responses:</Text>
                            {sleepData
                                .find((data) => data.date === selectedDate)
                                ?.inputText.map((text, index) => (
                                    <Text key={index.toString()}>{text}</Text>
                                ))}
                        </View>

                    ) : ( // If form has not been submitted, show input fields

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
                                                        style={{
                                                            borderWidth: 1,
                                                            padding: 10,
                                                            marginVertical: 10,
                                                            marginHorizontal: 15
                                                        }}
                                                        placeholder={index === 0 ? 'Title' : index === 1 ? 'Time, went to bed' : index === 2 ? 'Hours slept' : index === 3 ? 'Comments' : index === 4 ? 'Sleep quality' : ''}
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

            {/* Display all sleep data entries */}
            <Text style={{fontWeight: 'bold', marginVertical: 10}}>Sleep Data:</Text>
            <View>
                {sleepData.map((data) => (
                    <View key={data.date}>
                        <Text>{data.date}</Text>
                        <Button title="Edit" onPress={() => alert('Edit button pressed.')}/>
                        <Button title="Delete" onPress={() => handleDeleteSleepData(data.date)}/>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default SleepTracker;

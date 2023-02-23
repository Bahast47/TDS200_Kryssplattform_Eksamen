import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import SleepTracker from './SleepTracker';

const App = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <SleepTracker />
            </ScrollView>
        </SafeAreaView>
    );
};

export default App;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Homepage: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to My New App!</Text>
            <Text style={styles.subtitle}>This is the homepage.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
    },
});

export default Homepage;
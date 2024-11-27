import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

// Custom Button Component
interface CustomButtonProps {
  title: string;
  onPress: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({title, onPress}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default function App() {
  const [message, setMessage] = useState('Hello there!');

  const handlePress = () => {
    Alert.alert('Button pressed', 'You clicked the button!');
    setMessage('You clicked the button!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      {/* Use the custom button for better styling */}
      <CustomButton title="Press me" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Light background for better contrast
  },
  text: {
    fontSize: 24,
    color: 'blue',
    textAlign: 'center',
    marginBottom: 20, // Added some space between text and button
  },
  button: {
    backgroundColor: '#6200EE', // Material Design purple color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 3, // Add some shadow to the button
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

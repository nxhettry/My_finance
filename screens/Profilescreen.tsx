import React from 'react';
import {View, Text} from 'react-native';

export default function Profilescreen({navigation, route}) {
  return (
    <View>
      <Text>Welcome {route.params.name}</Text>
    </View>
  );
}

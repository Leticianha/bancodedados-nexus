import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SelectClass = () => {
  const navigation = useNavigation();
  const [selectedClass, setSelectedClass] = useState('');

  const classes = ["1° ano A", "1° ano B", "2° ano A", "2° ano B", "3° ano A", "3° ano B"];

  return (
    <View>
      <Text>Selecione a Turma:</Text>
      {classes.map((classItem, index) => (
        <Button
          key={index}
          title={classItem}
          onPress={() => {
            setSelectedClass(classItem);
            navigation.navigate('Attendance', { selectedClass: classItem });
          }}
        />
      ))}
    </View>
  );
};

export default SelectClass;

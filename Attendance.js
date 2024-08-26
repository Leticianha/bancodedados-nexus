import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { getDatabase, ref, set, get, update } from 'firebase/database';

const Attendance = ({ route }) => {
  const { selectedClass } = route.params;
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const db = getDatabase();
    const classRef = ref(db, `classes/${selectedClass}`);

    get(classRef).then(snapshot => {
      if (snapshot.exists()) {
        const studentsData = snapshot.val();
        if (typeof studentsData === 'object') {
          setStudents(Object.keys(studentsData));
          setAttendance(studentsData);
        } else {
          setStudents(studentsData);
          const initialAttendance = studentsData.reduce((acc, student) => {
            acc[student] = 0;
            return acc;
          }, {});
          setAttendance(initialAttendance);
        }
      } else {
        const defaultStudents = ["Aluno 1", "Aluno 2", "Aluno 3", "Aluno 4", "Aluno 5"];
        set(classRef, defaultStudents);
        setStudents(defaultStudents);
        const initialAttendance = defaultStudents.reduce((acc, student) => {
          acc[student] = 0;
          return acc;
        }, {});
        setAttendance(initialAttendance);
      }
    });
  }, [selectedClass]);

  const handleIncrementAbsence = (student) => {
    const newAttendance = { ...attendance, [student]: (attendance[student] || 0) + 1 };
    setAttendance(newAttendance);
  };

  const handleSave = () => {
    const db = getDatabase();
    const absencesRef = ref(db, `absences/${selectedClass}`);
    update(absencesRef, attendance);
  };

  return (
    <View>
      <Text>Turma: {selectedClass}</Text>
      {students.map((student, index) => (
        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <Text>{student}</Text>
         
          <Button
            title="Marcar Falta"
            onPress={() => handleIncrementAbsence(student)}
          />
        </View>
      ))}
      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
};

export default Attendance;

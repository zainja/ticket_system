import React, {useEffect, useState} from "react";
import {Alert, TextInput, TouchableOpacity, View} from "react-native";
import {Text} from "react-native-elements";
import styles from "../../../styles/stylesheet";
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSelector} from "react-redux";
import {selectToken} from "../../../features/tokenSlice";
import axios from 'axios'
import AuthHead from "../../../AuthHeader";

const TasksForTeams = ({navigation, route}) => {
    const selector = useSelector(selectToken)
    const [target,setTarget] = useState("date1")
    const {teamName} = route.params
    const [date, setDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const onChange = (event, selectedDate) => {
        console.log(target)
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        if (target === "date1")
            setDate(currentDate);
        else setEndDate(currentDate)
    };
    const onSubmit = () => {
        if (date > endDate || date < Date.now()) {
            console.log(date)
            console.log(endDate)
            Alert.alert("Invalid",
                "Pick another date that is not in the past")
            return
        }
        if (title === "" || description === "") {
            Alert.alert("Invalid",
                "Title or description are empty")
            return
        }
        const startDate = date.toISOString().slice(0, 19).replace('T', ' ')
        const endDateCut = endDate.toISOString().slice(0, 19).replace('T', ' ')
        console.log(startDate)
        axios.post("http://localhost:5000/task/", {
            taskName: title,
            startDate: startDate,
            endDate: endDateCut,
            teamName: teamName,
            description: description
        }, AuthHead(selector.value))
            .then(res => Alert.alert("Successful",
                "Task was published", [{
                    text: "Go Back",
                }]))
            .catch(err => {Alert.alert("Error occurred", "Retry later")
            })
    }
    const onChangeForEndDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setEndDate(currentDate);
    }
    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatePicker = () => {
        showMode('date');
    };

    const showTimePicker = () => {
        showMode('time');
    };
    return (
        <View style={styles.form}>
            <Text style={styles.label}>Task Title</Text>
            <TextInput style={styles.input}
                       placeholder="Enter task name"
                       onChangeText={text => setTitle(text)}
                       value={title}/>
            <Text style={styles.label}>Description</Text>
            <TextInput style={{fontSize: 20}}
                       multiline
                       placeholder="Enter Description"
                       onChangeText={text => setDescription(text)}
                       value={description}
            />
            <View style={{flexDirection: "column"}}>
                <Text style={styles.label}>
                    Start Date:
                </Text>
                <View style={{flexDirection: "row", justifyContent: "space-evenly", alignItems: "stretch", padding: 3}}>
                    <TouchableOpacity
                        style={styles.dateButton}
                        id="date1"
                        onPress={() => {
                            setTarget("date1")
                            showTimePicker()
                        }}>
                        <Text style={styles.dateButtonText}>{date.toLocaleTimeString()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        id="date1"
                        style={styles.dateButton}
                        onPress={() => {
                            setTarget("date1")
                            showDatePicker()}}>
                        <Text style={styles.dateButtonText}>{date.toDateString()}</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>
                    End Date:
                </Text>
                <View style={{flexDirection: "row", justifyContent: "space-evenly", alignItems: "stretch", padding: 3}}>
                    <TouchableOpacity
                        style={styles.dateButton}
                        id="date2"
                        onPress={() => {
                            setTarget("date2")
                            showTimePicker()}}>
                        <Text style={styles.dateButtonText}>{endDate.toLocaleTimeString()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.dateButton}
                        id="date2"
                        onPress={() => {
                            setTarget("date2")
                            showDatePicker()}}>
                        <Text style={styles.dateButtonText}>{endDate.toDateString()}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
            <TouchableOpacity
                style={styles.loginButton}
                onPress={onSubmit}>
                <Text style={styles.LoginButtonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}
export default TasksForTeams
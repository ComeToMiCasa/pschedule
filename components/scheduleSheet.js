import { useEffect, useState } from "react"
import { StyleSheet, Text, ToastAndroid, View } from "react-native"
import ScheduleEntry from "./scheduleEntry"
import storage from "../src/storage"
import useDidComponentMount from "../hooks/useDidComponentMount"

const ScheduleSheet = ({ title, prefix, color, fontColor, onClick }) => {
	const [todos, setTodos] = useState([])
	const didComponentMount = useDidComponentMount()

	useEffect(() => {
		if(prefix === undefined) {
			return
		}
		const data = storage.getString(prefix + ".todos")
		if(data) {
			setTodos(JSON.parse(data))
		} 
	}, [])

	useEffect(() => {
		if(didComponentMount && prefix !== undefined){
			storage.set(prefix + ".todos", JSON.stringify(todos))
		}
		console.log(todos)
	}, [todos])

	const handleAdd = () => {
		if(todos.length >= 10){
			ToastAndroid.show("최대 10개까지 설정 가능합니다", ToastAndroid.SHORT)
			return
		}
		setTodos([
			...todos,
			{ name: "", isChecked: false, isEditing: true}
		])
		onClick()
	}

	const handleCheck = (num) => {
		setTodos(todos.map((data, index) => (num == index ? {
			...data,
			isChecked: !data.isChecked
		} : data)))
	}

	const handleEdit = (num) => {
		setTodos(todos.map((data, index) => (num == index ? {
			...data,
			isEditing: true,
		} : data)))
	}

	const handleDelete = (num) => {
		setTodos(todos.filter((_, index) => index != num))
	}

	const handleSubmit = (num) => (text) => {
		setTodos(todos.map((data, index) => (num == index ? {
			...data,
			isEditing: false,
			name: text
		} : data)))
	}

	const todoList = todos.map((data, index) => (
		<ScheduleEntry 
			{...data} 
			onCheck={() => handleCheck(index)} 
			onSubmit={handleSubmit(index)}
			onEdit={() => handleEdit(index)}
			onDelete={() => handleDelete(index)}
			key={index} 
		/>
	))


	return (
		<View style={{
			...styles.scheduleSheet,
			backgroundColor: color,
		}}>
			<ScheduleTitle title={title} onAdd={handleAdd} fontColor={fontColor}/>
			{todoList}
		</View>
	)
}

const ScheduleTitle = ({ title, onAdd, fontColor }) => {
	return (
		<View style={styles.scheduleTitle}>
			<Text 
				style={{...styles.scheduleTitleText, color: fontColor}}
			>
				{title}
			</Text>
			<Text 
				style={{...styles.scheduleTitleText, color: fontColor}}
				onPress={onAdd}>
				+
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	scheduleSheet: {
		width: "100%",
		height: "90%",
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
		borderTopRightRadius: 40
	},
	scheduleTitle: {	
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10
	},
	scheduleTitleText: {
		fontSize: 25,
		color: "#4c5885",
		fontWeight: "bold"
	}
})

export default ScheduleSheet
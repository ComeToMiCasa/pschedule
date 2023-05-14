import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, TouchableHighlight, ToastAndroid, Alert } from "react-native"
import unchecked from "../assets/unchecked.png"
import checked from "../assets/checked.png"
import cancel from "../assets/delete.png"
import edit from "../assets/edit.png"
import { useEffect, useState } from "react"

const ScheduleEntry = ({ name, isChecked, isEditing, onCheck, onSubmit, onEdit, onDelete }) => {
	const [text, setText] = useState("")

	useEffect(() => setText(name), [name])

	const handleCheckClick = () => {
		if(!isChecked) { 
			Alert.alert(
				"완료하기",
				"할 일을 완료하시겠습니까?", 
				[{
					text: "취소",
					onPress: () => {},
					style: "cancel"
				}, 
				{
					text: "확인",
					onPress: onCheck
				}]
			)} else {
			onCheck()
		}
	}

	const handleDeleteClick = () => {
		if(isChecked) {
			Alert.alert(
				"이미 완료한 할 일입니다",
				"그래도 삭제하시겠습니까?",
				[{
					text: "취소",
					onPress: () => {},
					style: "cancel"
				}, 
				{
					text: "확인",
					onPress: onDelete
				}]
			)
		} else {
			onDelete()
		}
	}

	return (
		<View style={styles.scheduleEntry}>
			<TouchableOpacity onPress={handleCheckClick}>{/*체크버튼*/}
				<Image 
					style={styles.checkBox}
					source={isChecked ? checked : unchecked}
				/>
			</TouchableOpacity>
			{isEditing ? 
				<TextInput 
					style={styles.scheduleEntryInput}
					value={text}
					placeholder="할 일을 입력하세요"
					selectionColor="black"
					onChangeText={setText}
					autoFocus
				/> : 
				<Text style={styles.scheduleEntryText}>{name}</Text>
			}
			{isEditing ? 
				<View style={styles.editButtonContainer}>
					<TouchableHighlight 
						style={styles.editButton}
						onPress={() => {
							if(text === "") {
								ToastAndroid.show("할 일을 입력해주세요", ToastAndroid.SHORT)
							} else {
								onSubmit(text)
							}
						}}
					>
						<Text>완료</Text>
					</TouchableHighlight>
					<TouchableHighlight 
						style={styles.editButton}
						onPress={handleDeleteClick}
					>
						<Text>삭제</Text>
					</TouchableHighlight>
				</View>
				:
				<View style={styles.editButtonContainer}>
					<TouchableOpacity onPress={onEdit}>
						<Image 
							style={styles.rightButton}
							source={edit}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={handleDeleteClick}>
						<Image 
							style={styles.rightButton} 
							source={cancel}
						/>
					</TouchableOpacity> 
				</View>
			}
		</View>
	)
}

const styles = StyleSheet.create({
	scheduleEntry: {
		width: "90%",   
		height: 45,
		backgroundColor: "white",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		borderRadius: 10,
		marginTop: 17,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		paddingLeft: 20,
		paddingRight: 15
	},
	scheduleEntryText: {
		fontSize: 20,
		marginLeft: 20,
		width: 230
	},
	scheduleEntryInput: {
		width: 200,
		height: 35,
		borderBottomWidth: .5,
		marginLeft: 20,
		padding: 0,
		fontSize: 18
	},
	checkBox: {
		width: 21,
		height: 21,
	},
	rightButton: {
		width: 21,
		height: 21,
		marginLeft: 10
	},
	editButtonContainer: {
		display: "flex",
		flexDirection: "row",
		width: 80,

	},
	editButton: {
		marginLeft: 10,
		height: 30,
		width: 40,
		backgroundColor: "lightgray",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	}
})

export default ScheduleEntry
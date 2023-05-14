import React, { useEffect, useRef, useState } from "react"
import { Animated, StyleSheet, TouchableWithoutFeedback, View, Text, Dimensions } from "react-native"
import ScheduleSheet from "./components/scheduleSheet"
import auth from "@react-native-firebase/auth"

const App = () => {

	const [user, setUser] = useState(undefined)
	const [today, setToday] = useState(undefined)
	const [tomorrow, setTomorrow] = useState(undefined)

	const height = Dimensions.get("window").height

	const moveAnimated = useRef(new Animated.Value(height - 80)).current

	useEffect(() => {
		const todayDate = new Date()
		if(todayDate.getHours() < 4) {
			todayDate.setDate(todayDate.getDate() - 1)
		}	
		const tomorrowDate = new Date(todayDate.getTime())
		tomorrowDate.setDate(tomorrowDate.getDate() + 1)
		
		setToday(todayDate.toLocaleDateString())
		setTomorrow(tomorrowDate.toLocaleDateString())
	}, [])

	useEffect(() => {
		return auth().onAuthStateChanged((user) => {
			if(user) {
				setUser(user)
			} else {
				console.log("user logged out")
				setUser(user)
			}
		})
	}, [])

	useEffect(() => {
		auth()
			.signInAnonymously()
			.then(() => {
				console.log("signed in anonymously")
			})
			.catch((e) => {
				console.error(e)
			})
	}, [])

	const toTop = () => {
		Animated.timing(moveAnimated,{ 
			toValue: 110, 
			duration: 400,
			useNativeDriver: false
		}).start()
	}

	const toBottom = () => {
		Animated.timing(moveAnimated, {
			toValue: height - 80, 
			duration: 400,
			useNativeDriver: false
		}).start()
	}

	return (
		(today && tomorrow) ? (
			<View style={styles.container}>
				<TouchableWithoutFeedback onPress={toBottom}>
					<View style={styles.todayContainer}>
						<ScheduleSheet 
							title="오늘 할 일" 
							prefix={today} 
							color="white" 
							fontColor="#4C5885"
							onClick={toBottom}
						/>
					</View>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback onPress={toTop}>
					<Animated.View
						style={{
							...styles.tomorrowContainer,
							top: moveAnimated
						}}
					>
						<ScheduleSheet 
							title="내일 할 일" 
							prefix={tomorrow} 
							color="#587FFF" 
							fontColor="white"
							onClick={toTop}
						/>
					</Animated.View>
				</TouchableWithoutFeedback>
			</View>) : (
			<Text>Loading...</Text>
		)
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ededed",
		alignItems: "center",
	},
	todayContainer: {
		width: "100%",
		height: "100%",
		position: "absolute",
		top: "7%",
		flex: 1
	},
	tomorrowContainer: {
		position: "absolute",
		width: "100%",
		height: "100%",
	}
})

export default App
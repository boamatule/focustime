import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';
import { spacingSizes } from '../../utils/sizes';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';


export const Timer = ({ focusSubject }) => {
	const [isStarted, setIsStarted] = useState(false)
	return (
		<View style={styles.container}>
			<View style={styles.countdown}>
				<Countdown isPaused={!isStarted}/>
			</View>
			<View style={{ paddingTop: spacingSizes.xxl }}>
				<Text style={styles.title}>Focusing on:</Text>
				<Text style={styles.task}>{focusSubject}</Text>
			</View>
			<View style={styles.buttonWapper}>
				{isStarted ? (
					<RoundedButton 
					title="pause"
					size = {80}
					onPress={() => setIsStarted(false)}
					/>
				) : (
					<RoundedButton 
					title="start" 
					size = {80}
					onPress={() => setIsStarted(true)}
					/>
				)
			}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
    flex: 1,
	},
	title: {
		color: colors.white,
		textAlign: 'center'
	},
	task: {
		fontWeight: 'bold',
		textAlign: 'center'
	},
	countdown : {
		flex: 0.5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonWapper : {
		flex: 0.3,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
	},
});
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { colors } from '../../utils/colors';
import { spacingSizes } from '../../utils/sizes';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';


export const Timer = ({ focusSubject }) => {
	const [isStarted, setIsStarted] = useState(false);
	const [progress, setProgress] = useState(1);

	const onProgress = (progress) => {
		setProgress(progress)
	}
	return (
		<View style={styles.container}>
			<View style={styles.countdown}>
				<Countdown 
					isPaused={!isStarted}
					onProgress={onProgress}
				/>
			</View>
			<View style={{ paddingTop: spacingSizes.xxl }}>
				<Text style={styles.title}>Focusing on:</Text>
				<Text style={styles.task}>{focusSubject}</Text>
			</View>
			<View style={{ paddingTop: spacingSizes.sm }}>
				<ProgressBar 
					color='#5E84E2'
					style={{height: 10}}
					progress={progress}
				/>
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
		textAlign: 'center',
		color: colors.white,
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
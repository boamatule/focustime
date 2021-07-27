import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { colors } from '../../utils/colors';
import { spacingSizes } from '../../utils/sizes';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';

export const Timer = ({ focusSubject }) => {
	useKeepAwake();
	
	const [minutes, setMinutes] = useState(0.1)
	const [isStarted, setIsStarted] = useState(false);
	const [progress, setProgress] = useState(1);

	const onProgress = (progress) => {
		setProgress(progress)
	}
	const changeTime = (min) => {
		setMinutes(min),
		setProgress(1);
		setIsStarted(false);
	}
	return (
		<View style={styles.container}>
			<View style={styles.countdown}>
				<Countdown
					minutes={minutes}
					isPaused={!isStarted}
					onProgress={onProgress}
				/>
			</View>
			<View style={styles.buttonWapper}>
				<Timing onChangeTime={changeTime} />
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
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
	},
});
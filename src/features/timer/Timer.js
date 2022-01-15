import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { colors } from '../../utils/colors';
import { spacingSizes } from '../../utils/sizes';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';

const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
	useKeepAwake();

	const interval = React.useRef(null);
	const [minutes, setMinutes] = useState(DEFAULT_TIME);
	const [isStarted, setIsStarted] = useState(false);
	const [progress, setProgress] = useState(1);

	const onProgress = (progress) => {
		setProgress(progress);
	};
	
	const vibrate = () => {
		if(Platform.OS === 'ios') {
			const interval = setInterval(() => Vibration.vibrate(), 1000);
			setTimeout(() => clearInterval(interval), 10000);
		} else {
			Vibration.vibrate(10000)
		}
	};

	const onEnd = () => {
		vibrate();
		setMinutes(DEFAULT_TIME);
		setProgress(1);
		setIsStarted(false);
		onTimerEnd();
	};
	
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
					onEnd={onEnd}
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

			<View style={styles.buttonWapper}>
				<Timing onChangeTime={changeTime} />
			</View>
			
			<View style={styles.clearSubject}>
			<RoundedButton 
					title="-" 
					size = {50}
					onPress={() => clearSubject()}
					/>
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
	clearSubject: {
		paddingVertical: 25,
		paddingLeft: 25
	}
});
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';import { fontSizes, spacingSizes } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
	return (
		<Text style={styles.historyItem(item.status)}>
			{/* {JSON.stringify(item)} */}
			{item.subject}
		</Text>
	)
}
export const FocusHistory = ({ focusHistory, onClear }) => {
	const clearHistory = () => {
		onClear();
	}

	return (
		<>
			<SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
			{!!focusHistory.lengt && (
				<>
					<Text style={styles.title}>Things we've focused on</Text>
					<FlatList
						style={{ flex: 1 }}
						contentContainerStyle={{ flex: 1, alignItems: 'center' }}
						data={focusHistory}
						renderItem={HistoryItem}
					/>
					<View style={styles.clearContainer}>
						<RoundedButton
							size={75}
							title="Clear"
							onPress={() => onClear()}
						/>
					</View>
				</>
				)}
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	historyItem: (status) => ({
		color: status > 1 ? 'red' : 'green',
		fontSize: fontSizes.md
	}),
	title: {
		fontSize: fontSizes.lg,
		color: 'white'
	},
	clearContainer: {
		alignItems: 'center',
		padding: 'spacingSizes.md'
	}

})
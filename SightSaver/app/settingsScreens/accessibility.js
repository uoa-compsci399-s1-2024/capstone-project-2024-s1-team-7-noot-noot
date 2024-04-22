import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from '../../components/useColorScheme';
import Colors from '../../constants/Colors';

export default function AccessibilityScreen() {
    const colorScheme = useColorScheme();
    return (
        <View style={[styles.container, {backgroundColor:Colors[colorScheme ?? 'light'].background}]}>
            <Text style={{color:Colors[colorScheme ?? 'light'].text}}>Accessibility Settings coming soon...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    backButtonText: {
        marginLeft: 8,
        fontSize: 16,
    },
    optionsContainer: {
        flex: 1,
    },
    option: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        paddingHorizontal: 16,
    },
    optionText: {
        fontSize: 18,
    },
});
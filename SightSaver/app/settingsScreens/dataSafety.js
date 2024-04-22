import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from '../../components/useColorScheme';
import Colors from '../../constants/Colors';


export default function DataSafety() {
    const colorScheme = useColorScheme();
    return (
        <View style={[styles.container, {backgroundColor:Colors[colorScheme ?? 'light'].background}]}>
            <Text style={[styles.title, {color:Colors[colorScheme ?? 'light'].text}]}>How We Protect Your Data</Text>
            <Text style={[styles.paragraph, {color:Colors[colorScheme ?? 'light'].text}]}>
                We take your privacy and data security seriously. Here's how we protect your data:
            </Text>
            <Text style={[styles.paragraph, {color:Colors[colorScheme ?? 'light'].text}]}>
                1. Encryption: We use state-of-the-art encryption techniques to safeguard your data, ensuring it remains secure both during transmission and storage.
            </Text>
            <Text style={[styles.paragraph, {color:Colors[colorScheme ?? 'light'].text}]}>
                2. Access Control: Access to your data is strictly controlled and limited to authorized personnel who require it for specific purposes.
            </Text>
            <Text style={[styles.paragraph, {color:Colors[colorScheme ?? 'light'].text}]}>
                3. Regular Audits: We conduct regular security audits to identify and address any potential vulnerabilities in our systems.
            </Text>
            <Text style={[styles.paragraph, {color:Colors[colorScheme ?? 'light'].text}]}>
                4. Compliance: We adhere to relevant data protection regulations and industry standards to ensure your data is handled in accordance with best practices.
            </Text>
            <Text style={[styles.paragraph, {color:Colors[colorScheme ?? 'light'].text}]}>
                5. Transparency: We are transparent about our data handling practices and will only share your data when necessary for providing our services or as required by law.
            </Text>
            <Text style={[styles.title, {color:Colors[colorScheme ?? 'light'].text}]}>Who We Share Your Data With</Text>
            <Text style={[styles.paragraph, {color:Colors[colorScheme ?? 'light'].text}]}>
                We only share your data with trusted third parties when necessary for providing our services or as required by law. Rest assured, your privacy and data security are our top priorities.
            </Text>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 10,
    },
});

import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer } from 'react-navigation';
import AccessibilityScreen from './accessibility';

const screens = {
    Accessibility: {
        screen: AccessibilityScreen
    }
}


const Stack = createStackNavigator(screens);
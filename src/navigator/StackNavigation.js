import { NavigationContainer } from '@react-navigation/native';
import * as screens from '../screens'
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

export const StackNavigation = () =>{
    const loginDetails = useSelector(state => state.loginDetails)


    return (
        <NavigationContainer  >
        <Stack.Navigator initialRouteName={loginDetails.data.IsLogin === 'true' ? "Events" : "Signup" }>
        <Stack.Screen name="Signup" component={screens.Signup} />
        <Stack.Screen name="Events" component={screens.Events} />
        <Stack.Screen name="CreateEvent" component={screens.CreateEvent} />
        <Stack.Screen name="EventDetails" component={screens.EventDetails} />
        </Stack.Navigator>
        </NavigationContainer>
    )
}
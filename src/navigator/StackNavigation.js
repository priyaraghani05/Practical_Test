import { NavigationContainer } from '@react-navigation/native';
import * as screens from '../screens'
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

export const StackNavigation = () =>{
    const loginDetails = useSelector(state => state.loginDetails)


    return (
        <NavigationContainer  >
        <Stack.Navigator initialRouteName={loginDetails.data.IsLogin === 'true' ? "Signup" : "Signup" } screenOptions={{headerTitleAlign: 'center'}} >
        <Stack.Screen name="Signup" component={screens.Signup} />
        <Stack.Screen name="Events" component={screens.Events} />
        <Stack.Screen name="Create Event" component={screens.CreateEvent}
         options={({ route }) => ({
            title: route.params?.isEdit  ? 'Edit Event' : 'Create Event'
          })}
         />
        <Stack.Screen name="Event Details" component={screens.EventDetails} />
        </Stack.Navigator>
        </NavigationContainer>
    )
}
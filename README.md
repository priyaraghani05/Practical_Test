git clone <repository-url>

npm install

to run in ios we need to install pod install using (cd ios && pod install)
i have to test the app in ios because i have windows machine

npx react-native run-android

App Functionality:

Registration Screen: When the app opens, the first screen is the registration screen. Please enter valid details to register.

Event List Screen: After registration, you'll be taken to the event screen, which displays a list of filtered events.

Each event item supports swipe gestures: swiping reveals Edit and Delete options.

Tapping on an event item will navigate to the Event Details screen.

Create Event: There’s a “+” button at the bottom right corner. Tapping it will take you to the Create Event screen, where you can enter valid event details to add a new event.

Event Details Screen: This screen displays the full details of the selected event along with the next 5 occurrence dates, if applicable.

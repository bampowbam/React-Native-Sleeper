
# Sleeper Instructions.

I have implemented group chat. I built a simple functional chat UI in React Native with no backend.
We have to maintain states in order to send messages.

#  Functionalities
1. Send a message and have the message rendered with a dummy avatar, username, sent
timestamp.

2. Multiple messages sent by the same user should be grouped. Aka, it should only render
   the user avatar, username, and timestamp for the first message of the group

3. If I tap on the GIF button, it should open up a view that shows up to 50 trending gifs.
   Tapping a gif sends it into the chat

4. Periodically mock out incoming messages from other users.

# How to run

1. We have to install node modules using
   ```
   yarn install
   ```
   OR
   ```
   npm install
   ```
2. In order to run the project on **IOS** iphone 
   
   navigate to ios folder. run this command
 
   ```
   pod install
   ```

   There maybe some runtime errors with ios but please just dismiss all of them. 

3. After installing pods. We navigate to root folder
   and run command for ios

   ```
   npx react-native run-ios
   ```
4. For the android to run this command
  
   ```
   npx react-native run-android
   ```

   
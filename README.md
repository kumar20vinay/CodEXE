# CodEXE

### Introduction
Itroducing our advanced online code collaboration platform **CodEXE**. Designed for multiple users, it facilitates seamless real-time collaboration with live code editing. With an intuitive interface and robust backend, it ensures a smooth, efficient coding experience, perfect for boosting team productivity on projects.


### Features
1. **JWT Authentication :**
  JSON Web Tokens (JWTs) are a secure way to transmit information between parties. JWTs can be used for authorization and securely exchanging data.

2. **Real-time Updates :**
The system provides real-time updates on the code editor making it smooth for everyone else to be sync woth the code

3. **Responsive Web Design :**
The application adapts to different screen sizes and devices, ensuring a consistent user experience.
It supports both light and dark themes for user preference.

4. **Private Space :**
Enery user gets their own dashboard for monitoring their sessions and which they have joined.

5. **Registration Not Compulsory :**
User need not register eveytime. If user has the invitaion Id, he/she can enter the session freely.

### Future Development
1. **Compiler Integration**
Integrating the code area with the Compiler for remote excution at our app for better collaboration.

2. **Chat and Voice Call Integration**
It not always feels real without talking, so for that Integration with a chat sidebar and voice call feature.

3. **Local File Download**
User can Download the code file without having to copy or paste the code eveytime.

### Technologies
- Database - MongoDB
- Backend - Express.js & Node.js
- Frontend - React.js with MaterialUI
- Real-time messages - Socket.io
- Code Editor - CodeMirror

### How to use
1. Clone the repo
    ```
    git clone <The Repo Link>
    ```
2. go in folder
    ```
    cd CodEXE

    ```
3. Divide the console in two parts

4. Enter the server Directory
    ```
    cd server
    npm i
    ```

4. create .env file
   - Create Variables
   ```
    MONGO_SERVER_URI = YOUR MONGO CLUSTER URI    
    PORT = YOUR SERVER PORT
    JWT_SECRET = RANDOM STRING 
   ```
5. Run the server   
    ```
    npm start
    ```
    If you see "App is listening to port `YOUR_PORT` DB connection Success", you can run the client side.
    
6. go to client Directory
    ```
    cd client 
    npm i
    ```
7. file changes
```
1. goto /config/axiosConfig - change the URL
2. goto socket.js - change the URL
``` 
8. run the client
    ```
    npm start    
    ```
Thank You!

# Firebase Chat Application

This is a simple real-time chat application built with React.js and Firebase. The application allows users to send and receive messages in real-time with a single contact.

## Features

- Real-time messaging using Firebase Firestore
- User-friendly chat interface
- Responsive design

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (version 14 or later)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/firebase-chat-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd firebase-chat-app
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Add a web app to your Firebase project and copy the Firebase configuration.
   - Replace the configuration in `src/firebase/config.js` with your Firebase project settings.

5. Start the development server:
   ```bash
   npm start
   ```

6. Open your browser and go to `http://localhost:3000` to see the application in action.

## Usage

- Type your message in the input field and press "Send" to send a message.
- Messages will appear in the chat window in real-time.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
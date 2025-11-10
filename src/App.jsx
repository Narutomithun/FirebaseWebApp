import React, { useEffect, useState } from 'react';
import ChatBox from './components/ChatBox';
import MessageList from './components/MessageList';
import { db } from './firebase/config';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';

const App = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'messages'), (snapshot) => {
            const messagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(messagesData);
        });

        return () => unsubscribe();
    }, []);

    const sendMessage = async (message) => {
        await addDoc(collection(db, 'messages'), {
            text: message,
            createdAt: new Date(),
        });
    };

    return (
        <div className="App">
            <h1>Chat Application</h1>
            <MessageList messages={messages} />
            <ChatBox sendMessage={sendMessage} />
        </div>
    );
};

export default App;
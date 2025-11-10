import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import ChatInput from './ChatInput';
import MessageList from './MessageList';

const ChatBox = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('messages')
            .orderBy('timestamp')
            .onSnapshot(snapshot => {
                const fetchedMessages = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMessages(fetchedMessages);
            });

        return () => unsubscribe();
    }, []);

    const addMessage = async (message) => {
        await db.collection('messages').add({
            text: message,
            timestamp: new Date(),
        });
    };

    return (
        <div className="chat-box">
            <MessageList messages={messages} />
            <ChatInput addMessage={addMessage} />
        </div>
    );
};

export default ChatBox;
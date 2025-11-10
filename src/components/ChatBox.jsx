import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import ChatInput from './ChatInput';
import MessageList from './MessageList';

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Real-time listener - automatically fetches all previous messages
        // and listens for new ones in real-time (better than sockets!)
        const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
        
        const unsubscribe = onSnapshot(q, 
            (snapshot) => {
                const fetchedMessages = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMessages(fetchedMessages);
                setLoading(false);
            },
            (err) => {
                console.error("Error fetching messages:", err);
                setError(err.message);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const addMessage = async (message) => {
        try {
            await addDoc(collection(db, 'messages'), {
                text: message,
                timestamp: serverTimestamp(),
            });
        } catch (err) {
            console.error("Error sending message:", err);
            setError(err.message);
        }
    };

    if (loading) return <div className="chat-box">Loading messages...</div>;
    if (error) return <div className="chat-box">Error: {error}</div>;

    return (
        <div className="chat-box">
            <MessageList messages={messages} />
            <ChatInput addMessage={addMessage} />
        </div>
    );
};

export default ChatBox;
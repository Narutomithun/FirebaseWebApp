import React, { useEffect, useRef } from 'react';

const MessageList = ({ messages, currentUserId }) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="message-list">
            {messages.map((message) => {
                const isSent = message.senderId === currentUserId;
                return (
                    <div 
                        key={message.id} 
                        className={`message-wrapper ${isSent ? 'sent' : 'received'}`}
                    >
                        <div className={`message-bubble ${isSent ? 'sent' : 'received'}`}>
                            <span className="message-text">{message.text}</span>
                            {message.timestamp && (
                                <span className="message-time">
                                    {new Date(message.timestamp.seconds * 1000).toLocaleTimeString([], { 
                                        hour: '2-digit', 
                                        minute: '2-digit' 
                                    })}
                                </span>
                            )}
                        </div>
                    </div>
                );
            })}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default MessageList;
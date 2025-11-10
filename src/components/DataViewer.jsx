import React, { useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const DataViewer = () => {
    const [showTable, setShowTable] = useState(false);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAllMessages = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
            const querySnapshot = await getDocs(q);
            const fetchedMessages = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp ? new Date(doc.data().timestamp.seconds * 1000) : null
            }));
            setMessages(fetchedMessages);
            setShowTable(true);
        } catch (error) {
            console.error("Error fetching messages:", error);
            alert("Error fetching messages: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const closeTable = () => {
        setShowTable(false);
    };

    return (
        <>
            <button className="data-viewer-button" onClick={fetchAllMessages} disabled={loading}>
                {loading ? '📊 Loading...' : '📊 View Data'}
            </button>

            {showTable && (
                <div className="modal-overlay" onClick={closeTable}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>📊 All Messages Database</h2>
                            <button className="close-button" onClick={closeTable}>✕</button>
                        </div>
                        <div className="table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Message</th>
                                        <th>Sender ID</th>
                                        <th>Timestamp</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {messages.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: 'center' }}>No messages found</td>
                                        </tr>
                                    ) : (
                                        messages.map((msg) => (
                                            <tr key={msg.id}>
                                                <td>{msg.id}</td>
                                                <td>{msg.text}</td>
                                                <td>{msg.senderId || 'N/A'}</td>
                                                <td>{msg.timestamp ? msg.timestamp.toLocaleString() : 'N/A'}</td>
                                                <td>{msg.timestamp ? msg.timestamp.toLocaleDateString() : 'N/A'}</td>
                                                <td>{msg.timestamp ? msg.timestamp.toLocaleTimeString() : 'N/A'}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <p>Total Messages: {messages.length}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DataViewer;

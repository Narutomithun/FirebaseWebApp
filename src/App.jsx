import React from 'react';
import ChatBox from './components/ChatBox';
import DataViewer from './components/DataViewer';
import './App.css';

const App = () => {
    return (
        <div className="App">
            <div className="header">
                <h1>💬 MyChat - Stay Connected</h1>
                <DataViewer />
            </div>
            <ChatBox />
        </div>
    );
};

export default App;
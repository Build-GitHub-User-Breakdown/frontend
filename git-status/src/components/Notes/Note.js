import React from 'react';
import { Button } from 'antd';
import './note.css';

const Note = props => {
    return (
        <div className='note'>
            <span class='note-text'>{props.text}</span>
            <div className="note-buttons">
                <Button>Edit</Button>
                <Button type='danger'>Delete</Button>
            </div>
        </div>
    );
};

export default Note;
import React from 'react';

import Note from './Note';

const ListNotes = props => {
    return (
        // props.notes.map((note, idx) => <Note key={idx} noteId={idx} deleteNote={props.deleteNote} text={note.text} enableEdit={props.enableEdit} />)
        <p>{props.notes}</p>
    );
};

export default ListNotes;
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

import NoteForm from './NoteForm';
import Note from './Note';

import { connect } from "react-redux";
import { getFavorites } from "../../actions/actions";

import { AxiosWithAuth } from "../../authorization/AxiosWithAuth"

const NotesContainer = props => {

    const [note, setNote] = useState("");
    const [favoriteID, setFavoriteID] = useState(-1);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [noteIdToEdit, setNoteIdToEdit] = useState();

    useEffect(() => {
        console.log("getting favorites");
        props.getFavorites(props.userID);
    }, [])

    useEffect(() => {
        let favorite = props.favorites.filter((favorite) => { return favorite.favorites === props.username })[0];
        console.log("favorite undefined?", favorite);
        if (favorite) {
            setNote(favorite.notes);
            setFavoriteID(favorite.id);
        }
    }, [props.favorites])

    let hideButton = "{display: none}";

    const deleteNote = () => {
        AxiosWithAuth()
            .put("favorites/" + favoriteID + "/notes", { notes: "" })
            .then((res) => {
                setNote("");
            }
            )
            .catch(err => {
                console.log("Error deleting note", err);
            });
    };

    const enableEdit = () => {
        if (!showForm) setShowForm(true);
        setIsEditing(true);
    }

    const updateNote = note => {
        AxiosWithAuth()
            .put("favorites/" + favoriteID + "/notes", { notes: note })
            .then((res) => {
                setNote(note);
            })
            .catch(err => {
                console.log("Error updating note", err);
            });
    };

    if (props.isFetching) return (<p>Loading...</p>)

    if (favoriteID === -1) return (null);

    return (
        <div>
            <h3>Notes</h3>
            <Button type='primary' onClick={() => {//style={note.length > 0 ? hideButton : ""}
                setShowForm(true)
                setIsEditing(false)
            }
            }>Add Note</Button>
            {note.length > 0 ? <Note note={note} deleteNote={deleteNote} enableEdit={enableEdit} /> : null}
            {showForm ? <NoteForm showForm={setShowForm} isEditing={isEditing} updateNote={updateNote} /> : null}
        </div>
    );
};

const mapStateToProps = state => ({
    userID: state.userID,
    favorites: state.favorites,
    isFetching: state.isFetchingFavorites
});

export default connect(
    mapStateToProps,
    { getFavorites }
)(NotesContainer);


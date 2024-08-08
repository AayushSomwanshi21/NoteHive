import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    // Get all Notes
    const getNotes = async () => {

        const response = await fetch(`http://localhost:5000/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4ZmM0MzkxZDU0NzcyM2YzOGJhMGZhIn0sImlhdCI6MTcyMjQwNTE4OX0.ZJNNb6nYrVsDT7BvBh2qabAA6NVV9A7ziR56etqAadk'
            }
        });
        const json = await response.json();
        //console.log(json);
        setNotes(json);
    }

    // Update Note
    const editNote = async (id, title, description, tag) => {
        const url = `${host}/api/notes/updatenote/${id}`
        await fetch(url, {
            method: "PUT",
            body: JSON.stringify({ title, description, tag }),
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4ZmM0MzkxZDU0NzcyM2YzOGJhMGZhIn0sImlhdCI6MTcyMjQwNTE4OX0.ZJNNb6nYrVsDT7BvBh2qabAA6NVV9A7ziR56etqAadk'
            }
        });
        //const json = await response.json()
        //console.log(json)
        let new_notes = JSON.parse(JSON.stringify(notes))
        for (let i = 0; i < new_notes.length; i++) {
            if (new_notes[i]._id === id) {
                new_notes[i].title = title
                new_notes[i].description = description
                new_notes[i].tag = tag
                break;
            }
        }
        setNotes(new_notes)

    };
    // Delete Note
    const deleteNote = async (id) => {

        const newNotes = notes.filter((note) => note._id !== id)
        setNotes(newNotes)
        const url = `${host}/api/notes/deletenote/${id}`;
        await fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4ZmM0MzkxZDU0NzcyM2YzOGJhMGZhIn0sImlhdCI6MTcyMjQwNTE4OX0.ZJNNb6nYrVsDT7BvBh2qabAA6NVV9A7ziR56etqAadk'
            },
        });
    };

    // Add Note
    const addNote = async (title, description, tag) => {

        const url = `${host}/api/notes/addnote`
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({ title, description, tag }),
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4ZmM0MzkxZDU0NzcyM2YzOGJhMGZhIn0sImlhdCI6MTcyMjQwNTE4OX0.ZJNNb6nYrVsDT7BvBh2qabAA6NVV9A7ziR56etqAadk'
            },
        });

        const note = await response.json()
        setNotes(notes.concat(note));

    };

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>

    )

}

export default NoteState;


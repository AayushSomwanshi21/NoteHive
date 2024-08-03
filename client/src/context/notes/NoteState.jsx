import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const noteInitial = [
        {
            "_id": "66aa4507bb303516d816b1eb",
            "title": "Daily Workout",
            "description": "This is my daily workout",
            "tag": "personal",
            "date": "2024-07-31T14:07:03.733Z",
            "__v": 0
        },
        {
            "_id": "66aa46c0bb303516d816b1f7",
            "title": "Daily Workout",
            "description": "This is my daily workout",
            "tag": "personal",
            "date": "2024-07-31T14:14:24.819Z",
            "__v": 0
        },
        {
            "_id": "66ab55c0aaad31133327314f",
            "title": "Daily Workout",
            "description": "This is my daily workout",
            "tag": "personal",
            "date": "2024-08-01T09:30:40.553Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(noteInitial)
    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;


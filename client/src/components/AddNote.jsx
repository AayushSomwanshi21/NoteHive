import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useContext, useState } from "react"
import NoteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (event) => {
        event.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Note added successfully", "success");
    }
    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value });
    }

    return (
        <div className="container my-4">
            <h1>Add a Note</h1>
            <Form className="my-3">
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" id='title' placeholder="Title" name="title" value={note.title} onChange={onChange} minLength={5} required />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" id='description' placeholder="Description" name='description' value={note.description} onChange={onChange} minLength={5} required />
                </Form.Group>

                <Button disabled={note.title.length < 5 || note.description.length < 5} variant="primary" type="submit" onClick={handleClick}>
                    Add Note
                </Button>
            </Form>
        </div>
    )
}

export default AddNote
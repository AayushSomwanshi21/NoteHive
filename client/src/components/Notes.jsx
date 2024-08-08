import { useContext, useEffect, useState, useRef } from "react"
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const Notes = () => {

    // Modal States
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        // setCurrentNote(note);
        setShow(true);
    };

    // Context States
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    // Show modal
    const ref = useRef(null)
    const updatenote = (note) => {
        ref.current.click()
        setNote({ id: note._id, etitle: note.title, edescription: note.description, etag: note.tag });
    }

    // Edit note states


    const handleClick = (event) => {
        event.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        setNote({ etitle: "", edescription: "", etag: "" });
        handleClose()
    }
    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value });
    }

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <>
            <div>
                <AddNote />
                <Button className="d-none" variant="primary" onClick={handleShow} ref={ref}>
                    Edit
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Note</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="my-3">
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" id='etitle' placeholder="Title" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" id='edescription' placeholder="Description" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button disabled={note.etitle.length < 5 || note.edescription.length < 5} variant="primary" onClick={handleClick}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="row my-3">
                    <h1>Your Notes</h1>
                    <div className="container mx-2">
                        {notes.length === 0 && "No notes to display"}
                    </div>
                    {notes.map((note) => {
                        return <NoteItem key={note._id} note={note} updatenote={() => updatenote(note)} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes;
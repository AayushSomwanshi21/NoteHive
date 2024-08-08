import Card from 'react-bootstrap/Card';
import NoteContext from "../context/notes/NoteContext";
import { useContext } from 'react';

const NoteItem = (props) => {
    const { note, updatenote } = props
    const { deleteNote } = useContext(NoteContext)

    return (
        <div className='col-md-3'>
            <div className='card my-3'>
                <Card>
                    <Card.Body>
                        <Card.Title>{note.title}</Card.Title>
                        <Card.Text>
                            {note.description}
                        </Card.Text>
                        <i className="fa-solid fa-trash mx-2" onClick={() => deleteNote(note._id)}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => updatenote(note)}></i>
                    </Card.Body>
                </Card>
            </div>
        </div>

    )
}

export default NoteItem;
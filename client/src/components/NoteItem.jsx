import Card from 'react-bootstrap/Card';

const NoteItem = (props) => {
    const { note } = props
    return (
        <div className='col-md-3'>
            <div className='card my-3'>
                <Card>
                    <Card.Body>
                        <Card.Title>{note.title}</Card.Title>
                        <Card.Text>
                            {note.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>

        </div>

    )
}

export default NoteItem;
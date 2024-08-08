import Alert from 'react-bootstrap/Alert';

const Alert_Msg = (props) => {

    return (
        <>
            <Alert variant='danger'>
                {props.message}
            </Alert >
        </>
    )
}

export default Alert_Msg;
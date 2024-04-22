import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chatReducer';
import { AppDispatch, AppStateType } from '../../redux/reduxStore';
import { ChatMessageType } from '../../redux/chatReducer';


const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    );
};

const Chat: React.FC = () => {
    const status = useSelector((state: AppStateType) => state.chat.status)

    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            {status === 'error' ? <div>Some error occured. Please refresh the page</div>
                : <>
                    <Messages />
                    <AddMessageForm />
                </>}

        </div>
    );
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)

    return (
        <div style={{ height: '400px', overflow: 'auto' }}>
            {messages.map((m, index) => <Message key={index} message={m} />)}
        </div>
    );
}

const Message: React.FC<{ message: ChatMessageType }> = React.memo(({ message }) => {

    return <div>
        <img src={message.photo} alt='avatar' style={{ height: '40px', width: '40px' }} />
        <b>{message.userName}</b>
        <br />
        {message.message}
        <hr />
    </div>
})

const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const dispatch: AppDispatch = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return (
        <Formik
            initialValues={{ message: ' ' }}
            onSubmit={sendMessageHandler}
        >
            {() => (
                <Form
                    name="nest-messages"
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item name={['chat', 'message']} label="Message">
                        <Input.TextArea />
                    </Form.Item>
                    <Button disabled={status !== 'ready'} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

export default ChatPage
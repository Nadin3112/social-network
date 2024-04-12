import React from 'react';
import S from './Dialogs.module.css';
import DialogItem from './dialogItem/DialogItem';
import MessageItem from './message/MessageItem';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import { InitialStateType } from '../../redux/dialogsReducer';

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}

interface MyFormValues {
    newMessageElement: string 
}

const Dialogs: React.FC<PropsType> = (props) => {

    const addNewMessage = (values: MyFormValues, {resetForm}: FormikHelpers<MyFormValues>) => {
        props.sendMessage(values.newMessageElement);
        resetForm();
    }

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name} />);
    let messagesElements = props.dialogsPage.messages.map(m => <MessageItem key={m.id} message={m.message} id={m.id} />)

    return (
        <div className={S.dialogs}>
            <ul className={S.dialogList}>
                {dialogsElements}
            </ul>
            <div>
                <ul className={S.messageList}>
                    {messagesElements}
                </ul>
                <Formik
                    initialValues={{ newMessageElement: '' }}
                    onSubmit={addNewMessage}>
                    {() => (
                        <Form className={S.form}>
                            <Field as="textarea" name="newMessageElement" placeholder="Enter your message" />
                            <ErrorMessage name="newMessageElement" component="div" />
                            <button className={S.btn} type="submit">Send message</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Dialogs;
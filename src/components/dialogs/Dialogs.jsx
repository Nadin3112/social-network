import React from 'react';
import S from './Dialogs.module.css';
import DialogItem from './dialogItem/DialogItem';
import MessageItem from './message/MessageItem';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/formsControls/FormControls';
import { maxLengthCreator, required } from '../../utils/validators/validators';

const maxLengthCreator100 = maxLengthCreator(100);

const Dialogs = (props) => {

    const addNewMessage = (values) => {
        props.sendMessage(values.newMessageElement)
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
                <AddMessageReduxForm onSubmit={addNewMessage} />
            </div>
        </div>
    );
};

const AddMessageForm = (props) => {
    
    return (
        <form className={S.form} onSubmit={props.handleSubmit}>
            <Field component={Textarea} 
            name="newMessageElement" 
            placeholder="Enter your message"
            validate={[required, maxLengthCreator100]} />
            <button className={S.btn}> Send message</button>
        </form>
    );
};

const AddMessageReduxForm = reduxForm({
    form: 'dialogAddMessageForm'
})(AddMessageForm)

export default Dialogs;
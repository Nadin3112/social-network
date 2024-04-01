import React from 'react';
import S from './ProfileInfo.module.css';
import { Input, Textarea, createField } from '../../common/formsControls/FormControls';
import { reduxForm } from 'redux-form';

const ProfileDataForm = ({handleSubmit, profile, error}) => {

    return (
        <form onSubmit={handleSubmit}>
            <button>save</button>
            {error && <div className={S.formSummaryError}>{error}</div>}
            <div className={S.info}>
                <div>
                    <b>Full name:</b>  {createField("Full name", "fullName", [], Input)}
                </div>
            </div>
            <div>
                <b>Looking for a job: </b> {createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
            </div>
            <div>
                <b>My skills: </b> {createField("My skills", "lookingForAJobDescription", [], Textarea)}
            </div>
            <div>
                <b>About me: </b> {createField("About me", "aboutMe", [], Textarea)}
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                    return <div key={key} className={S.contacts}>
                        <b>{key}: {createField(key, "contacts." + key, [], Input)}</b>
                    </div>
                })} 
            </div>
        </form>
    );
};

const ProfileDatatReduxForm = reduxForm({ form: "editProfile" })(ProfileDataForm)

export default ProfileDatatReduxForm;
import React from 'react';
import S from './ProfileInfo.module.css';
import { Formik, Form, Field } from 'formik';
import { ProfileType } from '../../../types/types';

type Propstype = {
    profile: ProfileType
    handleSubmit: (formData: ProfileType) => void
}

const ProfileDataForm: React.FC<Propstype> = ({ profile, handleSubmit }) => {

    let objectFromApiCopy = JSON.parse(JSON.stringify(profile))
    return (
        <Formik
            initialValues={objectFromApiCopy }
            onSubmit={(values) => {
                handleSubmit(values)
            }}>
            {() => (
                <Form className={S.info}>
                    <label className={S.label}>Full name
                        <Field type="text" name="fullName" />
                    </label>
                    <label className={S.label}>Looking for a job
                        <Field type="checkbox" name="lookingForAJob" />
                    </label>
                    <label className={S.label}>My skills
                        <Field as="textarea" name="lookingForAJobDescription" />
                    </label>
                    <label className={S.label}>About me
                        <Field as="textarea" name="aboutMe" />
                    </label>
                    <div>
                        <label className={S.label}>Contacts:</label>
                        {Object.keys(profile.contacts).map(key => {
                            return <div key={key} className={S.contacts}>
                                <label>{key}: <Field type="text" name={key} />
                                </label>
                            </div>
                        })}
                    </div>
                    <button className={S.btn} type="submit">
                        Save
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default ProfileDataForm;
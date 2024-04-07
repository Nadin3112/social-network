import React from 'react';
import S from './ProfileInfo.module.css';
import { Formik, Form, Field } from 'formik';


const ProfileDataForm = ({  onSubmit, profile }) => {

    return (
        <Formik
                    initialValues={{
                        fullName: profile.fullName,
                        lookingForAJob: profile.lookingForAJob,
                        lookingForAJobDescription: profile.lookingForAJobDescription,
                        aboutMe: profile.aboutMe,
                        contacts: profile.contacts
                    }}
                    onSubmit={(values) => {
                        onSubmit(values)
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
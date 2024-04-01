import React from 'react';
import S from './FormControls.module.css';
import { Field } from 'redux-form';

const FormControl = ({ input, meta: {touched, error }, children, ...props }) => {
    const hasError = touched && error;
    return (
        <div className={S.formControl + " " + (hasError ? S.error : "")}>
            {children}
            {hasError && <p className={S.errorMessage}>{error}</p>}
        </div>
    );
};


export const Textarea = (props) => {
    return (
        <FormControl {...props}><textarea {...props.input} {...props} /></FormControl>
    );
};

export const Input = (props) => {
    return (
        <FormControl {...props}><input {...props.input} {...props} /></FormControl>
    );
};

export const createField = (placeholder, name, validators, component, props = {}) => (
    <Field name={name}
        placeholder={placeholder}
        component={component}
        validate={validators}
        {...props} />
)
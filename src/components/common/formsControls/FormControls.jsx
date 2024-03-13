import React from 'react';
import S from './FormControls.module.css';

const FormControl = ({input, meta, child, ...props}) => {
    const hasError =  meta.touched && meta.error;
    return (
        <div className={S.formControl + " " + (hasError ? S.error : "")}>
            {props.children}
            { hasError && <p className={S.errorMessage}>{meta.error}</p>}
        </div>
    );
};


export const Textarea = (props) => {
    return (
        <FormControl {...props}><textarea {...props.input} {...props}/></FormControl>
    );
};

export const Input =(props) => {
    return (
        <FormControl {...props}><input {...props.input} {...props}/></FormControl>
    );
};
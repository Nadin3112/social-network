import React from 'react';
import S from './Login.module.css'
import { Field, reduxForm } from 'redux-form';

const Login = (props) => {

    const onSubmit = (formData) => {
        console.log(formData);
    }
    return (
        <div className={S.login}>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    );
};

const LoginForm = (props) => {
    return (
        <form className={S.formLogin} onSubmit={props.handleSubmit}>
            <Field type={"text"} name={"login"} placeholder={"Login"} component={"input"} />
            <Field type={"password"} name={"password"} placeholder={"password"} component={"input"} />
            <label>
                <Field type={"checkbox"} name={"rememberMe"} component={"input"} />
                Remember me
            </label>
            <button type={"submit"}>Login</button>
        </form>
    );
};

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

export default Login;
import React from 'react';
import S from './Login.module.css'
import { Field, reduxForm } from 'redux-form';
import { Input } from '../common/formsControls/FormControls';
import { required } from '../../utils/validators/validators';

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
            <Field  name={"login"} placeholder={"Login"} component={Input} validate={[required]}/>
            <Field name={"password"} placeholder={"password"} component={Input} validate={[required]}/>
            <label>
                <Field type={"checkbox"} name={"rememberMe"} component={Input} />
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
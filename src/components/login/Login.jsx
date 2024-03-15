import React from 'react';
import S from './Login.module.css'
import { Field, reduxForm } from 'redux-form';
import { Input } from '../common/formsControls/FormControls';
import { required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/authReducer';
import { Navigate } from 'react-router-dom';

const LoginForm = (props) => {
    return (
        <form className={S.formLogin} onSubmit={props.handleSubmit}>
            <Field name={"email"} placeholder={"email"} component={Input} validate={[required]} />
            <Field type={"password"} name={"password"} placeholder={"password"} component={Input} validate={[required]} />
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


const Login = (props) => {

    if (props.isAuth) {
        return <Navigate to={"/profile"} />
    }
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }
    return (
        <div className={S.login}>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    );
};
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});


export default connect(mapStateToProps, { login })(Login);
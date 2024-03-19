import React from 'react';
import S from './Login.module.css'
import { reduxForm } from 'redux-form';
import { Input, createField } from '../common/formsControls/FormControls';
import { required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/authReducer';
import { Navigate } from 'react-router-dom';

const LoginForm = ({handleSubmit, error}) => {
    return (
        <form className={S.formLogin} onSubmit={handleSubmit}>
            {createField("Email", "email", [required], Input)}
            {createField("Password", "password", [required], Input, {type: "password"})}
            <label>
                {createField(null, "rememberMe", [], Input, {type: "checkbox"})}
                Remember me
            </label>
            {error && <div className={S.formSummaryError}>{error}</div>}
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
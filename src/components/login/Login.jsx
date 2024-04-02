import React from 'react';
import S from './Login.module.css'
import { reduxForm } from 'redux-form';
import { Input, createField } from '../common/formsControls/FormControls';
import { required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/authReducer';
import { Navigate } from 'react-router-dom';

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form className={S.formLogin} onSubmit={handleSubmit}>
            {createField("Email", "email", [required], Input)}
            {createField("Password", "password", [required], Input, {type: "password"})}
            <label>
                {createField(null, "rememberMe", [], Input, {type: "checkbox"})}
                Remember me
            </label>

            {captchaUrl && <img src={captchaUrl} alt=''/> }

            {captchaUrl && createField("Symbols from image", "captcha", [required], Input)}

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
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }
    return (
        <div className={S.login}>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    );
};
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, { login })(Login);
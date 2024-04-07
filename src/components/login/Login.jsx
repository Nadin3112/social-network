import React from 'react';
import S from './Login.module.css'
import { connect } from 'react-redux';
import { login } from '../../redux/authReducer';
import { Navigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { validationSchema } from '../../utils/validators/validators';

const Login = (props) => {

    if (props.isAuth) {
        return <Navigate to={"/profile"} />
    }


    const onSubmit = (formData, { setSubmitting, setStatus }) => {
        props.login(formData.email, formData.password, formData.rememberMe, setStatus, formData.captcha);
        setSubmitting(false);
    }

    return (
        <div className={S.login}>
            <h1>Login</h1>
            <Formik
                initialValues={{ email: '', password: '', rememberMe: false, captcha: '' }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {({ errors, touched, status }) => (
                    <Form className={S.formLogin}>
                        <div className={S.formSummaryError}>
                            {status}
                        </div>
                        <Field type="email" name="email" />
                        {errors.email && touched.email ? (<div className={S.formSummaryError}>{errors.email}</div>) : null}
                        <Field type="password" name="password" />
                        {errors.password && touched.password ? (<div className={S.formSummaryError}>{errors.password}</div>) : null}
                        <label>
                            <Field type="checkbox" name="checked" value="rememberMe" />
                            remember Me
                        </label>
                        {props.captchaUrl && <img src={props.captchaUrl} alt={'captcha'} />}
                        {props.captchaUrl && <Field name={'captcha'} />}
                        <button type="submit" >Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, { login })(Login);
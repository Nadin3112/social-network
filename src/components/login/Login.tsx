import React from 'react';
import S from './Login.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/authReducer';
import { Navigate } from 'react-router-dom';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { validationSchema } from '../../utils/validators/validators';
import { AppDispatch, AppStateType } from '../../redux/reduxStore';

interface MyFormValues {
    email: string
    password: string
    rememberMe: false, 
    captcha: string 
}

export const LoginPage:React.FC = (props) => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth =  useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch: AppDispatch = useDispatch()


    if (isAuth) {
        return <Navigate to={"/profile"} />
    }
    const onSubmit = (values: MyFormValues, { setSubmitting, setStatus}: FormikHelpers<MyFormValues> ) => {
        dispatch(login(values.email, values.password, values.rememberMe, setStatus, values.captcha));
        setSubmitting(false);
    }

    return (
        <div className={S.login}>
            <h1>Login</h1>
            <Formik
                initialValues = {{ email: '', password: '', rememberMe: false, captcha: '' }}
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
                        {captchaUrl && <img src={captchaUrl} alt={'captcha'} />}
                        {captchaUrl && <Field name={'captcha'} />}
                        <button type="submit" >Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

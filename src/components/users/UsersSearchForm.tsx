import React from 'react'
//import S from './Users.module.css'
import { Formik, Form, Field, FormikHelpers} from 'formik'
import { FilterType } from '../../redux/usersReducer'

const UsersSeachFormValidate = () => {
    const errors = {}
    return errors
}

type FormType = {
    term: string
    friend: 'true' | 'false' | 'null'
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
    
    const submit = (values: FormType, {setSubmitting}: FormikHelpers<FormType>) => {
		// convert friend to bool | number
		const filter: FilterType = {
			term: values.term,
			friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
		} 
		props.onFilterChanged(filter)
		setSubmitting(false)
	}
    
    return (
        <Formik
            initialValues={{ term: '', friend: 'null' }}
            validate={UsersSeachFormValidate}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" />
                    <Field as="select" name="friend">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type='submit' disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    )
})

export default UsersSearchForm;
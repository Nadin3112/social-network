import { compose } from 'redux'
import { withAuthNavigate } from '../../hoc/withAuthNavigate'
import { actions } from '../../redux/dialogsReducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/reduxStore'


const mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

const DialogsContainer = compose<React.ComponentType>(
    connect(mapStateToProps, {...actions}),
    withAuthNavigate)(Dialogs)

    export default DialogsContainer
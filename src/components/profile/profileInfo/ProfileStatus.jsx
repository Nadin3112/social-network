import React from 'react';
import S from './ProfileInfo.module.css';

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        });
    };

    deActivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <button className={S.ProfileStatusBtn} onDoubleClick={this.activateEditMode}>{this.props.status || "----"}</button>
                    </div>
                }
                {this.state.editMode &&
                    <form>
                        <input onChange={this.onStatusChange}
                            autoFocus={true} onBlur={this.deActivateEditMode}
                            value={this.state.status} />
                    </form>
                }
            </div>
        );
    };
}

export default ProfileStatus;
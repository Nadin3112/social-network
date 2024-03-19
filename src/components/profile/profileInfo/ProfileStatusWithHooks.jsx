import React, { useEffect, useState } from 'react';
import S from './ProfileInfo.module.css';

const ProfileStatusWithHooks = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deActivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <button className={S.ProfileStatusBtn} onDoubleClick={activateEditMode}>{props.status || "----"}</button>
                </div>
            }
            {editMode &&
                <form>
                    <input onChange={onStatusChange}
                    onBlur={deActivateEditMode}
                        autoFocus={true}
                        value={status} />
                </form>
            }
        </div>
    );
};

export default ProfileStatusWithHooks;
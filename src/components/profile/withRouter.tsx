import React from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";

function withRouter<WCP extends object> (Component: React.ComponentType<WCP>){
    const ComponentWithRouterProp = (props: WCP) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();

        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }
    return ComponentWithRouterProp;
}

export default withRouter;

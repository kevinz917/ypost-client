import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const auth = useSelector((state) => state.state.auth);

  // 0 : not checked
  // 1 : auth success
  // -1: auth failed

  switch (auth) {
    case 0:
      return null;
    case 1:
      return (
        <Route
          path={props.path}
          exact={props.exact}
          component={props.component}
        />
      );
    case -1:
      return <Redirect to="/" />;
    default:
      return null;
  }
};

export default PrivateRoute;

import React, { useContext } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { AppContext } from '../../contexts/Context';

const RedirectToLogin = withRouter(function(props) {
  props.history.push('/');
  return <React.Fragment />;
});

export default function AuthRoute(props: any) {
  const context = useContext(AppContext);

  let { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={props =>
        context.user ? <Component {...props} {...rest} /> : <RedirectToLogin />
      }
    />
  );
}

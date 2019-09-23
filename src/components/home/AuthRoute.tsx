import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { AppContext } from '../../contexts/Context';
import useRouter from '../_hook/useRouter';

const RedirectToLogin = function() {
  const { history } = useRouter();
  history.push('/');
  return <React.Fragment />;
};

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

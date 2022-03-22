import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect } from "react-router-dom";
import { getUserInfo } from '../../services/actions/user';

const ProtectedRoute = ({children, ...rest}) => {
  const {user} = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    <Route
      {...rest}
      render={({location}) =>
        user.name ? (
          children
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: {from: location}
          }}/>
        )
      }
    />
  );
};

export default ProtectedRoute;

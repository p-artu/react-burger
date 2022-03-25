import React, {useEffect, FC} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect, RouteProps } from "react-router-dom";
import { getUserInfo } from '../../services/actions/user';
import { TUserStore, TUser } from '../../utils/types';

const ProtectedRoute: FC<RouteProps> = ({children, ...rest}) => {
  const user = useSelector<TUserStore, TUser>(store => store.user.user);
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

import React, {useEffect, FC} from "react";
import { useSelector, useDispatch } from '../../services/hooks';
import { Route, Redirect, RouteProps } from "react-router-dom";
import { getUserInfo } from '../../services/actions';

const ProtectedRoute: FC<RouteProps> = ({children, ...rest}) => {
  const user = useSelector(store => store.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    <Route
      {...rest}
      render={({location}) =>
        user.name !== '' ? (
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

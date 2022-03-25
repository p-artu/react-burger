import React, {useEffect, FC} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect, RouteProps } from "react-router-dom";
import { getUserInfo } from '../../services/actions/user';

type TUser = {
  user: {
    name: string;
    email: string;
  };
};
type TUserStore = {
  user: TUser;
};
interface IProtectedRoute extends RouteProps {
  exact: boolean;
  path: string;
}
const ProtectedRoute: FC<IProtectedRoute> = ({children, exact, path}) => {
  const {user} = useSelector<TUserStore, TUser>(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    <Route
      exact={exact}
      path={path}
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

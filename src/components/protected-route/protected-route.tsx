import { Redirect, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../services/actions/user';

interface IProtectedRouteProps {
  children: React.ReactNode;
  path: string
}
type TLoginProps = {
  user: {
    isLoggedIn: boolean;
    isLoginRequestCompleted: boolean;
  };
};

export function ProtectedRoute({ children, ...rest }: IProtectedRouteProps) {
  const dispatch = useDispatch();
  const { isLoggedIn, isLoginRequestCompleted } = useSelector(
    (state: TLoginProps) => state.user,
  );

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      {isLoginRequestCompleted ? (
        <Route
          {...rest}
          render={({ location }) =>
            isLoggedIn ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: location },
                }}
              />
            )
          }
        />
      ) : null}
    </>
  );
}

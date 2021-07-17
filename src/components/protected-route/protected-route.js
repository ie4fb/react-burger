import { Redirect, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../services/actions/user';

export function ProtectedRoute({ children, ...rest }) {
  const dispatch = useDispatch();
  const { isLoggedIn, isLoginRequestCompleted } = useSelector(
    state => state.user,
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

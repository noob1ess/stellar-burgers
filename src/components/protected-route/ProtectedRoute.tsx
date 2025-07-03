import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { fetchUser } from '../../services/slices/user';
import { selectUserAuthChecked, selectUserData } from '@selectors';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

function ProtectedRoute({ children, onlyUnAuth }: ProtectedRouteProps) {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const isAuthChecked = useSelector(selectUserAuthChecked);

  useEffect(() => {
    if (!isAuthChecked) {
      dispatch(fetchUser());
    }
  }, [dispatch, isAuthChecked]);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user && user.email) {
    const from = location.state?.from || { pathname: '/' };
    const backgroundLocation = location.state?.from?.background || null;
    return (
      <Navigate replace to={from} state={{ background: backgroundLocation }} />
    );
  }

  if (!onlyUnAuth && (!user || !user.email)) {
    return (
      <Navigate
        replace
        to={'/login'}
        state={{
          from: {
            ...location,
            background: location.state?.background,
            state: null
          }
        }}
      />
    );
  }

  return <>{children}</>;
}

export default ProtectedRoute;

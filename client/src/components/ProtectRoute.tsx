import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';

export const ProtectRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const isAllowedRole = auth?.roles?.find((role) =>
    allowedRoles.includes(role)
  );

  const isSignedIn = Boolean(auth?.username);
  const isAdminRoute = allowedRoles.includes('admin')

  return (
    <>
      {isAllowedRole && <Outlet />}

      {!isAllowedRole && isSignedIn && (
        <Navigate to='/unauthorised' state={{ from: location }} replace />
      )}

      {!isAllowedRole && !isSignedIn && (
        <Navigate to='/auth/signin' state={{ from: location }} replace />
      )}

      {!isAllowedRole && !isSignedIn && isAdminRoute && (
        <Navigate to='/unauthorised' state={{ from: location }} replace />
      )}
    </>
  );
};

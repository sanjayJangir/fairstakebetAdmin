import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// Layouts
const FullLayout = lazy(() => import('../layouts/full/FullLayout'));
const BlankLayout = lazy(() => import('../layouts/blank/BlankLayout'));

// Views
const Dashboard = lazy(() => import('../views/dashboards/Dashboard'));
const ChatApp = lazy(() => import('../views/chat/ChatApp'));
const Table = lazy(() => import('../views/tables/Table'));
const Form = lazy(() => import('../views/form/Form'));
const Solar = lazy(() => import('../views/icons/Solar'));
const SamplePage = lazy(() => import('../views/sample-page/SamplePage'));
const ProfileSettings = lazy(() => import('../views/settings/ProfileSettings'));
const SystemSettings = lazy(() => import('../views/settings/SystemSettings'));
const Login = lazy(() => import('../views/auth/login/Login'));
const Error = lazy(() => import('../views/auth/error/Error'));

// Protected Route
import ProtectedRoute from './ProtectedRoute';

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const Router: RouteObject[] = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <FullLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      { 
        path: '/', 
        element: <Navigate to="/dashboard" replace /> 
      },
      { 
        path: '/dashboard', 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Dashboard />
          </Suspense>
        ) 
      },
      { 
        path: '/chats', 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ChatApp />
          </Suspense>
        ) 
      },
      { 
        path: '/users', 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Table />
          </Suspense>
        ) 
      },
      { 
        path: '/ui/form', 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Form />
          </Suspense>
        ) 
      },
      { 
        path: '/icons/solar', 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Solar />
          </Suspense>
        ) 
      },
      { 
        path: '/sample-page', 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SamplePage />
          </Suspense>
        ) 
      },
      { 
        path: '/settings',
        children: [
          { 
            path: 'profile', 
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <ProfileSettings />
              </Suspense>
            ) 
          },
          { 
            path: 'system', 
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <SystemSettings />
              </Suspense>
            ) 
          },
        ]
      },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <BlankLayout />
      </Suspense>
    ),
    children: [
      { 
        path: 'login', 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Login />
          </Suspense>
        ) 
      },
      { 
        path: '404', 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Error />
          </Suspense>
        ) 
      },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;


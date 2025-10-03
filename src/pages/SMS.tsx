import { AuthLayout } from '@/components/auth/AuthLayout'
import SMSLoginForm from '@/components/custom/SMSLoginForm';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

export default function SMS() {
  const { isAuthenticated, smsUser } = useSelector((state: RootState) => state.smsAuth);
  return (
    <>
      {isAuthenticated ? (
        <DashboardLayout
          title={`Hello, ${smsUser.firstname} ${smsUser.lastname}`}
          breadcrumbs={[{ label: "SMS Dashboard" }]}
        >
          <h1>Hello Logged User</h1>
        </DashboardLayout>
      ) : (
        <AuthLayout
          title="Welcome Back"
          subtitle="Sign in to your School Management System account"
        >
          <SMSLoginForm />
        </AuthLayout>
      )}
    </>
  )
}
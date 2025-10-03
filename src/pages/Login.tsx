import { AuthLayout } from '@/components/auth/AuthLayout'
import LoginForm from '@/components/custom/LoginForm';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

export default function Login() {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your Benion-Tech account"
    >
      <LoginForm />
    </AuthLayout>
  )
}
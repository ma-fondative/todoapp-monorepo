import { LoginForm } from '@/components/auth/login-form';
import { login } from '@/app/api/auth';
import { redirect } from 'react-router';
import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import type { LoginReqBody } from '@todoapp/api/types/auth';
import { AUTH_TOKEN_KEY } from '@/constants/auth';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get('redirectTo') || '/';

  if (localStorage.getItem(AUTH_TOKEN_KEY)) {
    return redirect(redirectTo);
  }
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get('redirectTo') || '/';

  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { accessToken } = await login({ email, password } as LoginReqBody);
  localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
  return redirect(redirectTo);
}

export function Component() {
  return <LoginForm />;
}

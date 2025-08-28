import { RegisterForm } from '@/components/auth/register-form';
import { type ActionFunctionArgs } from 'react-router';
import { registerSchema } from '@todoapp/api/schemas/request/auth';
import { register as apiRegister } from '@/app/api/auth';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const parsedData = registerSchema.parse(data);
  return apiRegister(parsedData)
    .then(() => true)
    .catch(() => false);
}

export function Component() {
  return <RegisterForm />;
}

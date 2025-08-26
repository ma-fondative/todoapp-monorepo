import { Link, useNavigation } from 'react-router';
import { useFetcher } from "react-router";
import { cn } from '@todoapp/ui/lib/utils';
import { Button } from '@todoapp/ui/components/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@todoapp/ui/components/card';
import { Input } from '@todoapp/ui/components/input';
import { Label } from '@todoapp/ui/components/label';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const navigation = useNavigation();
  const fetcher = useFetcher();

  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <fetcher.Form method="post">
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </div>
            </div>
            {fetcher.state === "submitting" && <span>Envoi en cours...</span>}
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </fetcher.Form>
        </CardContent>
      </Card>
    </div>
  );
}

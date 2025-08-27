import { type UserResponse } from '@todoapp/api/types/users';
import Logo from '@/assets/logo.svg?react';
import { UserDropdown } from './user-dropdown';

interface HeaderProps {
  user: UserResponse;
}

export function Header({ user }: HeaderProps) {
  return (
    <nav className="bg-muted flex items-center justify-between border-b py-2">
      <a href="/" className="flex items-center gap-2 font-medium">
        <Logo className="h-9" />
      </a>
      <UserDropdown user={user} />
    </nav>
  );
}

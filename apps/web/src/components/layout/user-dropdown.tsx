import { type UserResponse } from '@todoapp/api/types/users';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@todoapp/ui/components/dropdown-menu';
import { Button } from '@todoapp/ui/components/button';
import { CircleUser, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router';
import { AUTH_TOKEN_KEY } from '@/constants/auth';

interface UserDropdownProps {
  user: UserResponse;
}

export function UserDropdown({ user }: UserDropdownProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <CircleUser className="h-5 w-5" />
          <span className="text-sm font-medium">
            {user.firstname} {user.lastname}
          </span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.firstname} {user.lastname}
            </p>
            <p className="text-muted-foreground text-xs leading-none">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleNavigation('/users')}>
          Users
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigation('/todos')}>
          Todos
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

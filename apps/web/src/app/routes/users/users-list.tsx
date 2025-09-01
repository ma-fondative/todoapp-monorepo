import {
  useLoaderData,
  Link,
  type LoaderFunctionArgs,
  useNavigate
} from 'react-router';
import { useState } from 'react';
import { apiClient } from '@/lib/api-client';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext
} from '@todoapp/ui/components/pagination';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@todoapp/ui/components/table';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from '@todoapp/ui/components/card';
import type {
  PaginatedUserResponse,
  UserResponse
} from '@todoapp/api/types/users';

interface LoaderData {
  users: UserResponse[];
  totalPages: number;
  currentPage: number;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') || '1';
  const limit = url.searchParams.get('limit') || '10';

  const response = await apiClient.get<unknown, PaginatedUserResponse>(
    `/users?page=${page}&limit=${limit}`
  );

  return {
    users: response.data,
    totalPages: Math.ceil(response.meta.total / +limit),
    currentPage: response.meta.page
  };
}

export function Component() {
  const { users, totalPages, currentPage } = useLoaderData() as LoaderData;
  const [currentPageState, setCurrentPageState] = useState(currentPage);
  const navigate = useNavigate();

  const handlePageChange = (newPage: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', newPage.toString());
    navigate(url.pathname + url.search);
    setCurrentPageState(newPage);
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <h1>User List</h1>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Link to={`/users/${user.id}`}>{user.email}</Link>
                  </TableCell>
                  <TableCell>{user.firstname}</TableCell>
                  <TableCell>{user.lastname}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(user.updatedAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Pagination>
            <PaginationContent>
              {currentPageState > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPageState - 1)}
                  />
                </PaginationItem>
              )}
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index + 1}>
                  <PaginationLink
                    onClick={() => handlePageChange(index + 1)}
                    isActive={currentPageState === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {currentPageState < totalPages && (
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPageState + 1)}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
    </div>
  );
}

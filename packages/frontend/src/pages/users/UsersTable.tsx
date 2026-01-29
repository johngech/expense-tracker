import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import type { User } from "@/services/user-service";

interface Props {
  users: User[];
}
const UsersTable = ({ users }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" onClick={() => alert("Edit")}>
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="ml-2"
                onClick={() => alert("Delete")}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;

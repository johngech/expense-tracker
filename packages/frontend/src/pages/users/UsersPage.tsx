import { useUsers } from "@/hooks";
import { UsersTable } from ".";

const UsersPage = () => {
  const { users, error, isLoading } = useUsers();
  if (isLoading) return <div className="text-red-400">Loading...</div>;
  if (error) return <div className="text-red-400">{error}</div>;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <UsersTable users={users} />
    </div>
  );
};

export default UsersPage;

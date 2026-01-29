import { useEffect, useState } from "react";
import { userService, type User } from "./services/user-service";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "./components/ui/card";

function App() {
  const [users, setUsers] = useState<User[]>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAll();
    request
      .then((data) => {
        if (data) setUsers(data);
      })
      .catch((error) => {
        setError((error as Error).message);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => cancel(); // cleanup on unmount
  }, []);
  if (isLoading) return <div className="text-red-400">Loading...</div>;
  if (error) return <div className="text-red-400">{error}</div>;
  return (
    <div className="flex min-h-svh items-center justify-center">
      {users?.map((user) => (
        <Card key={user.id}>
          <CardHeader>{user.name}</CardHeader>
          <CardContent>{user.email}</CardContent>
          <CardFooter>{user.createdAt}</CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default App;

import { type User, userService } from "@/services/user-service";
import { useState, useEffect } from "react";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
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

  return { users, error, isLoading };
}

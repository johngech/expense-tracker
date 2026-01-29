// pages/UserCreatePage.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserSchema } from "@/schemas/UserSchema";
import { type z } from "zod";
import { UserForm } from ".";
import { createApiClient } from "@/services/api-client";

type CreateUserInput = z.infer<typeof CreateUserSchema>;
const userService = createApiClient<CreateUserInput>("/users");

export default function UserCreatePage() {
  const form = useForm<CreateUserInput>({
    resolver: zodResolver(CreateUserSchema),
  });

  const onSubmit = (data: CreateUserInput) => {
    try {
      userService.create(data);
      alert("User created successfully");
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Create User</h2>
      <UserForm form={form} onSubmit={onSubmit} />
    </div>
  );
}

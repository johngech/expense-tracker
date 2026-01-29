import { createApiClient } from "./api-client";

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export const userService = createApiClient<User>("/users");

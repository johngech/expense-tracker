import { createApiClient } from "./api-client";

export interface User {
  id: number;
  name: string;
}

export const userService = createApiClient<User>("/users");

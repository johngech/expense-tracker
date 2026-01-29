"use client";

import { Form as ShadForm } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { type UseFormReturn } from "react-hook-form";

interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Props {
  form: UseFormReturn<User>;
  onSubmit: (data: User) => void;
  submitText?: string;
}

const UserForm = ({ form, onSubmit, submitText = "Submit" }: Props) => {
  const { register, handleSubmit, formState } = form;

  return (
    <ShadForm {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <Label>Name</Label>
          <Input {...register("name")} />
          {formState.errors.name && (
            <p className="text-red-500">{formState.errors.name.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label>Email</Label>
          <Input type="email" {...register("email")} />
          {formState.errors.email && (
            <p className="text-red-500">{formState.errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label>Password</Label>
          <Input type="password" {...register("password")} />
          {formState.errors.password && (
            <p className="text-red-500">{formState.errors.password.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label>Confirm Password</Label>
          <Input type="password" {...register("confirmPassword")} />
          {formState.errors.confirmPassword && (
            <p className="text-red-500">
              {formState.errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit">{submitText}</Button>
      </form>
    </ShadForm>
  );
};

export default UserForm;

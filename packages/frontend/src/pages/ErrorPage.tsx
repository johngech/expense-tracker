"use client";

import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function ErrorPage() {
  const error = useRouteError();

  let message = "Something went wrong.";
  let status = 500;

  if (isRouteErrorResponse(error)) {
    status = error.status;
    message = error.statusText || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardContent className="text-center">
          <h1 className="text-5xl font-bold text-red-600 mb-2">{status}</h1>
          <p className="text-lg text-gray-700">{message}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="hover:bg-gray-100"
          >
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

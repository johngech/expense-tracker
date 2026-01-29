/**
 * Wraps a Promise and returns null if the request was aborted.
 */

import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";

export async function safeRequest<T>(
  promise: Promise<AxiosResponse<T>>,
): Promise<T | null> {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      // Request was aborted — ignore it
      return null;
    }
    throw error as AxiosError;
  }
}

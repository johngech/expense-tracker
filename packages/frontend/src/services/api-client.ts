import axios from "axios";
import { envConfig } from "../config/envConfig";
import { safeRequest } from "./safeRequest";

const { baseUrl, apiKey } = envConfig.api;

const apiClient = axios.create({
  baseURL: `${baseUrl}/api`,
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
  withCredentials: true,
});

export interface RequestWithCancel<T> {
  request: Promise<T | null>;
  cancel: () => void;
}

class HttpService<T> {
  private endpoint: string;
  public constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  private createController(): AbortController {
    return new AbortController();
  }

  public getAll = (): RequestWithCancel<T[]> => {
    const controller = this.createController();
    return {
      request: safeRequest(
        apiClient.get<T[]>(this.endpoint, { signal: controller.signal }),
      ),
      cancel: () => controller.abort(),
    };
  };

  public getById = (id: number): RequestWithCancel<T> => {
    const controller = this.createController();
    return {
      request: safeRequest<T>(
        apiClient.get<T>(`${this.endpoint}/${id}`, {
          signal: controller.signal,
        }),
      ),
      cancel: () => controller.abort(),
    };
  };

  public create = (data: T): RequestWithCancel<T> => {
    const controller = this.createController();
    return {
      request: safeRequest<T>(
        apiClient.post<T>(this.endpoint, data, { signal: controller.signal }),
      ),
      cancel: () => controller.abort(),
    };
  };

  public update = (id: number, data: Partial<T>): RequestWithCancel<T> => {
    const controller = this.createController();
    return {
      request: safeRequest<T>(
        apiClient.patch<T>(`${this.endpoint}/${id}`, data, {
          signal: controller.signal,
        }),
      ),
      cancel: () => controller.abort(),
    };
  };

  public delete = (id: number): RequestWithCancel<void> => {
    const controller = this.createController();
    return {
      request: safeRequest<void>(
        apiClient.delete<void>(`${this.endpoint}/${id}`, {
          signal: controller.signal,
        }),
      ),
      cancel: () => controller.abort(),
    };
  };
}

export function createApiClient<T>(endpoint: string) {
  return new HttpService<T>(endpoint);
}

import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
});

class HttpService<T> {
  private endpoint: string;
  public constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  public getAll = () => {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  };
}

export function createApiClient<T>(endpoint: string) {
  return new HttpService<T>(endpoint);
}

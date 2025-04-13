export interface ClientResponse<T> {
  code: string;
  message: string;
  body: T;
}
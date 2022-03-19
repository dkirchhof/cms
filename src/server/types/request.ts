export interface IRequest<T> {
    method: "GET" | "PUT" | "POST" | "DELETE";
    body: T;
}

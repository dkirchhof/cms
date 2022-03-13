export interface IResponse {
    status: (code: number) => this;
    send: (message: string) => void;
    json: (json: any) => void;
    end: () => void;
}

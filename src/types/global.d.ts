declare global {
    export interface Request {
        token?: string;
        user?: any;
      }
}

export {}
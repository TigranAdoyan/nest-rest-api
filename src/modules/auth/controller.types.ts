export type SignUpReqBody = {
    username: string;
    email: string;
    password: string;
    age: number;
}

export type SignInReqBody = {
    username: string;
    password: string;
}

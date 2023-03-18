export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
}

export type SignUpProps = {
    username: string;
    email: string;
    password: string;
}

export type SignInProps = {
    username: string;
    password: string;
}

export type SignInReturn = {
    token: string;
    user: User;
}

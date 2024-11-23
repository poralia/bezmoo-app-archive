export interface ILogin {
    usr: string;
    pwd: string;
}

export interface IRegister {
    email: string;
    full_name: string;
    pwd: string;
}

export interface ICredentials {
    api_key: string
    api_secret: string;
}

export interface IUser {
    full_name: string;
    username: string;
    email: string;
    roles: string[];
}
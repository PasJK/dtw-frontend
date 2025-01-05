export type AuthLoginResponse = string;

export type GetAuthResponse = {
    id: string;
    username: string;
    lastLogin: string;
    inActivityLimit: number;
    tokenType: string;
    iat: number;
    exp: number;
};

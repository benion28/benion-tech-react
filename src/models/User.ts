export interface DecryptedToken {
    success: boolean,
    data: unknown
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface User {
    profile?: string | null,
    job?: string | null,
    _id?: string | null,
    role?: string | null,
    amountBalance?: number | null,
    firstname?: string | null,
    lastname?: string | null,
    username?: string | null,
    town?: string | null,
    email?: string | null,
    password?: string | null,
    gender?: string | null,
    birthday?: string | null,
    date?: string | null,
    __v?: number | null,
    token: string | null,
}

export interface AuthResponse {
    success: boolean,
    message: string,
    data: User | null
}
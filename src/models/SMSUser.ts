export interface SMSLoginCredentials {
    email: string;
    password: string;
}

type Roles = "ADMIN" | "STUDENT" | "PARENT" | "TEACHER" | "MODR"

export interface SMSUser {
    id?: string,
    firstname?: string,
    lastname?: string,
    email?: string,
    clientemail?: string,
    address?: string,
    balance?: number,
    dateofbirth?: string,
    joiningdate?: string,
    gender?: "MALE" | "FEMALE" | "OTHERS",
    middlename?: string,
    password?: string,
    phone?: string,
    religion?: string,
    created_at?: string,
    access_token?: string,
    refresh_token?: string,
    user_id?: string,
    clientEmail?: string,
    roles?: Roles[] | {id: number, name: Roles }[]
}

export interface SMSAPIResponse<T> {
    meta: {
        status: string,
        message: string,
        success: boolean
    },
    data: T
}


export type UserInsert = {
    email: string,
    name: string,
    password: string,
    role: "admin" | "user",
}

export type DataPagination<T> = {
    data?: T[],
    total: number,
    limit: number,
    offset: number,
    totalPages: number,
}

export type ServerFNResponse = {
    success: boolean,
    message: string,
    error?: string,
    errors?: Record<string, string[]>,


}
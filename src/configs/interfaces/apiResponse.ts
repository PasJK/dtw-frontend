export interface ApiResponse<T> {
    code: number;
    status: string;
    serviceCode: string;
    serviceMessage: string;
    data?: T;
}

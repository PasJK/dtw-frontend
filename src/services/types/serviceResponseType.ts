export type ServiceMeta = {
    page: number;
    perPage: number;
    total: number;
    totalRecord: number;
    totalPage: number;
} | null;

export type ServiceResponseWithMeta<T> = {
    data: T;
    meta: ServiceMeta;
};

export type ServiceResponse<T> = {
    code: number;
    status: string;
    serviceCode: string;
    serviceMessage: string;
    data: T;
    meta: ServiceMeta;
};

import axiosInstance from './config/axiosInstance';
import { useUpdateQueryParams } from '../contexts/Querycontext';
import { useCallback } from 'react';

export async function requestLogApi(queryParams) {
    return axiosInstance.get("account/log", { params: queryParams });
}

export function useSyncQueryParams() {
    const updateQueryParams = useUpdateQueryParams();

    const syncParams = useCallback((values) => {
        if (values.username !== undefined) { updateQueryParams("username", values.username); }
        if (values.role !== undefined) { updateQueryParams("role", values.role); }
        if (values.ip !== undefined) { updateQueryParams("ip", values.ip); }
        if (values.fName !== undefined) { updateQueryParams("f_name", values.fName); }
        if (values.date !== undefined) { updateQueryParams("date", values.date); }
        updateQueryParams("page", 1);
    }, [updateQueryParams]);

    return syncParams;
}

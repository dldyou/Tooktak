import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { requestLogApi } from '../services/log';
import { useQueryParams, useUpdateQueryParams } from './Querycontext';

const LogContext = createContext({
    logs: [],   // 기본값으로 빈 배열 설정
    setLogs: () => { },
    fetchLogs: () => { },
    logsCount: 0,
});


export const LogProvider = ({ children }) => {
    const [logs, setLogs] = useState([]);
    const { queryParams } = useQueryParams();
    const [logsCount, setLogsCount] = useState(0);
    const updateQueryParams = useUpdateQueryParams();

    const fetchLogs = useCallback(async () => {
        setLogs([]); // 초기 로그 상태를 비움 
        try {
            const res = await requestLogApi(queryParams); // 현재 queryParams 사용 
            if (res.status === 204) {
                console.log("No log matched");
                setLogs([]);
                setLogsCount(0);
            } else if (res.status === 200) {
                setLogs(res.data);
                setLogsCount(res.data.length);
            }
        } catch (error) {
            console.error("Failed to fetch logs:", error);
            setLogs([]); // 오류 발생 시, 빈 배열 설정 
            setLogsCount(0);
        }
    }, [queryParams]);

    const updateAndFetchLogs = useCallback((field, value) => {
        updateQueryParams(field, value);
        setTimeout(() => {
            fetchLogs();
        }, 0);
    }, [fetchLogs, updateQueryParams]);

    return (
        <LogContext.Provider value={{ logs, setLogs, fetchLogs, logsCount, updateAndFetchLogs }}>
            {children}
        </LogContext.Provider>
    );
}

export function useLogs() {
    const context = useContext(LogContext);
    if (!context) {
        throw new Error('useLogs must be used within a LogProvider');
    }
    return context;  // 객체를 반환, { logs, setLogs }
}


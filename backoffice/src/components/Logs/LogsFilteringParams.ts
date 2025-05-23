import { allPermissions } from './../../common/allPermissions';
import type { Permission, Logs } from '@prisma-app/client';

export type LogsFilteringParams = {
    userIdFilter: string,
    permissionFilter: Permission[],
    loginFilter: string,
    searchPhrase: string,
    timeFrom: Date | null,
    timeEnd: Date | null,
    hideSelf: boolean,
};

export function createDefaultParams(): LogsFilteringParams {
    return {
        userIdFilter: '',
        permissionFilter: allPermissions,
        loginFilter: '',
        searchPhrase: '',
        timeFrom: null,
        timeEnd: null,
        hideSelf: true,
    }
}

export function filterLogs(logs: Logs[], filteringParams: LogsFilteringParams, selfLogin: string) {
    const loginFilter = filteringParams.loginFilter.toLowerCase();
    const userIdFilter = filteringParams.userIdFilter.toLowerCase();
    const searchPhrase = filteringParams.searchPhrase.toLowerCase();
    const timeFrom = typeof filteringParams.timeFrom === 'string' ? new Date(filteringParams.timeFrom) : null;
    const timeEnd = typeof filteringParams.timeEnd === 'string' ? new Date(filteringParams.timeEnd) : null;

    return logs.filter(l => filteringParams.permissionFilter.includes(l.permission))
        .filter(l => l.login.toLowerCase().includes(loginFilter))
        .filter(l => l.userId.toString().includes(userIdFilter))
        .filter(l => l.message.toLowerCase().includes(searchPhrase))
        .filter(l => timeFrom ? new Date(l.time) >= timeFrom : true)
        .filter(l => timeEnd ? new Date(l.time) <= timeEnd : true)
        .filter(l => !filteringParams.hideSelf || l.login !== selfLogin);
}
import { allPermissions } from './../../common/allPermissions';
import type { Permission } from '@prisma/client';
import type { Logs } from '@prisma/client';

export type LogsFilteringParams = {
    userIdFilter: string,
    permissionFilter: Permission[],
    loginFilter: string,
    searchPhrase: string,
    timeFrom?: Date,
    timeEnd?: Date,
};

export function createDefaultParams(): LogsFilteringParams {
    return {
        userIdFilter: '',
        permissionFilter: allPermissions,
        loginFilter: '',
        searchPhrase: '',
        timeFrom: null,
        timeEnd: null,
    }
}

export function filterLogs(logs: Logs[], filteringParams: LogsFilteringParams) {
    const loginFilter = filteringParams.loginFilter.toLowerCase();
    const userIdFilter = filteringParams.userIdFilter.toLowerCase();
    const searchPhrase = filteringParams.searchPhrase.toLowerCase();
    const timeFrom = typeof filteringParams.timeFrom === 'string' ? new Date(filteringParams.timeFrom) : null;
    const timeEnd = typeof filteringParams.timeEnd === 'string' ? new Date(filteringParams.timeEnd) : null;

    return logs.filter(l => filteringParams.permissionFilter.includes(l.permission))
        .filter(l => l.login.toLowerCase().includes(loginFilter))
        .filter(l => l.id.toLowerCase().includes(userIdFilter))
        .filter(l => l.message.toLowerCase().includes(searchPhrase))
        .filter(l => timeFrom ? new Date(l.time) >= timeFrom : true)
        .filter(l => timeEnd ? new Date(l.time) <= timeEnd : true);
}
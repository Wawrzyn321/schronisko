import { get, writable } from 'svelte/store';

export type NotifyParams = {
    message: string;
    duration?: number;
    type?: 'is-white' | 'is-black' | 'is-light' | 'is-dark' | 'is-primary' | 'is-info' | 'is-success' | 'is-warning' | 'is-danger';
}

export type NotifyParamsSpecialized = Omit<NotifyParams, 'type'>;

export const notificationQueue = writable<NotifyParams[]>([]);

export const notify = (notifyParams: NotifyParams) => {
    notificationQueue.update(prev => [...prev, { ...notifyParams, position: 'is-bottom' }]);
}

export const notifySuccess = (notifyParams: NotifyParamsSpecialized) => {
    notify({ ...notifyParams, type: 'is-success' });
}

export const notifyError = (notifyParams: NotifyParamsSpecialized) => {
    notify({ ...notifyParams, type: 'is-danger' });
}

export const notifyInfo = (notifyParams: NotifyParamsSpecialized) => {
    notify({ ...notifyParams, type: 'is-info' });
}

export const dropFirst = () => {
    notificationQueue.update(prev => prev.splice(1));
}

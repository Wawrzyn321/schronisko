import { useEffect, useState } from "react";
import { FetchError, fetchSettings } from 'api/api';
import { Settings } from '@prisma-app/client';

export function useLoadSettings(ssrSettings: Settings[]) {
    const [settings, setSettings] = useState<Settings[]>(ssrSettings);
    const [error, setError] = useState<FetchError>();

    useEffect(() => {
        const loadSettings = async () => {
            const { data, error } = await fetchSettings();
            setSettings(data);
            setError(error);
        };

        loadSettings();
    }, []);

    return { settings, error }
}
export interface AppConfig {
    apiUrl: string;
    production: boolean;
}

export const environment: AppConfig = {
    apiUrl: 'http://localhost:8000',
    production: false,
}
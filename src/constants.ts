const isTestEnv = process.env.NODE_ENV === 'test';

export const serverHost: string = isTestEnv
  ? process.env.VITE_SERVER_HOST
  : import.meta.env.VITE_SERVER_HOST;

export const queryKey: string = isTestEnv
  ? process.env.VITE_QUERY_KEY
  : import.meta.env.VITE_QUERY_KEY;

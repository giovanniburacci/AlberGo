const localhostBase = 'http://localhost:8080';

export const localhostURL = localhostBase + '/api/';

export const mockTimeout = async () => new Promise(resolve => setTimeout(resolve,2000))
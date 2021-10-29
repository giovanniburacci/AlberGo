const localhostBase = 'http://192.168.1.68:8080';

export const localhostURL = localhostBase + '/api/';

export const mockTimeout = async () => new Promise(resolve => setTimeout(resolve,2000))
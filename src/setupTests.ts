import '@testing-library/jest-dom/extend-expect';
import {AxiosResponse} from 'axios';

jest.mock('react-redux', () => ({
    useDispatch: () => jest.fn,
    useSelector: jest.fn()
}));

jest.mock('axios', () => ({
    put: jest.fn(),
    post: jest.fn(),
    get: jest.fn(),
    delete: jest.fn()
}))
export const actionTypeAdapter = (action: any) => ({
    type: action.type,
    payload: action.payload
});

export const fakeAxiosReturn = (returnValue: any): AxiosResponse<typeof returnValue> => {
    return {
        data: returnValue,
        status: 0,
        statusText: '',
        headers: {},
        config: {}
    }
}
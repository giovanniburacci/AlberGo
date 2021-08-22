import {createAction} from '@reduxjs/toolkit'

export const testAction = 'testAction';

export const testActionRequest = createAction(testAction);


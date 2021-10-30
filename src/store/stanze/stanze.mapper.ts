import {StanzaDTO} from '../../models/models';
import {StanzaStatus, StanzaWithStatus} from './types';

export const mapStanze = (stanze:StanzaDTO[], status?:StanzaStatus):StanzaWithStatus[] => {
    return stanze.map(stanza => ({
        ...stanza,
        status
    }))
}
import { RefContext } from 'src/components';

export const { Provider, useRefContext, useWatch } = RefContext.createContext({
    current: '0'
});
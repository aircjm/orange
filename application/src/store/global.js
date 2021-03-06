import {createContext, useReducer} from 'react';

export const defaultValue = {
    // 登录用户信息
    user: { //
        name: "",
        alias: "",
        token: "",
    },
    // 主题色
    theme: 'violet',
    breadcrumb: [],
    title: '主页',
};

export const GlobalStore = createContext(defaultValue);

const reducer = (state, action) => {
    switch (action.type) {
        case 'user':
            return {...state, user: action.payload};
        case 'theme':
            return {...state, theme: action.payload};

        case 'title':
            return {...state, title: action.payload};
        case 'message':
            return {...state, message: action.payload};
        case 'breadcrumb':
            return {...state, breadcrumb: action.payload};
        case 'responsive':
            return {...state, responsive: action.payload};
        default:
            return {...state, ...action.payload}
    }
}


const GlobalStoreProvider = props => {
    const [store, dispatch] = useReducer(reducer, defaultValue);
    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <GlobalStore.Provider value={{...store, dispatch}}>
            {props.children}
        </GlobalStore.Provider>
    );
};
export default GlobalStoreProvider;

import { Action, Reducer } from 'redux';
import { AppThunkAction } from '..';

export interface LoginState {
    isSignedIn: boolean;
    user: UserState;
}

export interface UserState {
    id: string;
    userName: string;
}

interface GetIsSignedIn {
    type: 'GET_IS_AUTHENTICATED';
}

interface IsSignedIn {
    type: 'IS_AUTHENTICATED';
    isSignedIn: boolean;
}

interface GetUser {
    type: 'GET_USER';
}

interface RecieveUser {
    type: 'RECEIVE_USER';
    user: UserState;
}

type KnownAction = IsSignedIn | GetUser | RecieveUser | GetIsSignedIn;

export const actionCreators = {
    IsSignedIn: (user: UserState): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.bookList) {
            fetch(`https://localhost:44396/api/Account/IsSignedIn`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(user)
            })
                .then(response => response.json() as Promise<boolean>)
                .then(data =>
                    dispatch({ type: 'IS_AUTHENTICATED', isSignedIn: data })
                )

            dispatch({ type: 'GET_IS_AUTHENTICATED' })
        }
    },
    GetUser: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.bookList) {
            fetch(`https://localhost:44396/api/Account/GetUser`)
                .then(response => response.json() as Promise<UserState>)
                .then(data =>
                    dispatch({ type: 'RECEIVE_USER', user: data })
                );

            dispatch({ type: 'GET_USER' });
        }
    }
};

const unloadedState: LoginState = { isSignedIn: false, user: { id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", userName: "" } as UserState };

export const reducer: Reducer<LoginState> = (
    state: LoginState | undefined,
    incomingAction: Action
): LoginState => {

    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;

    switch (action.type) {
        case 'GET_USER':
            return {
                ...state
            };
        case 'RECEIVE_USER':
            return {
                ...state,
                user: state.user,
                isSignedIn: state.isSignedIn,
            };
        case 'GET_IS_AUTHENTICATED':
            return {
                ...state
            };
        case 'IS_AUTHENTICATED':
            return {
                ...state,
                user: state.user,
                isSignedIn: action.isSignedIn,
            };
        default: {
            return state;
        }
    }

};
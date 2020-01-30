import { Action, Reducer } from 'redux';
import { BookState } from './BookList';

export const actionCreators = {};

const unloadedState: BookState = { id: "0", name: "", stock: 0, price: 0 };

export const reducer: Reducer<BookState> = (
    state: BookState | undefined,
    incomingAction: Action
): BookState => {

    if (state === undefined) {
        return unloadedState;
    }
    return state;
}

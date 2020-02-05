import { Action, Reducer } from 'redux';
import { AppThunkAction } from '..';

export interface BookState {
    book: BookStateProps,
    redirect: boolean
}

export interface BookStateProps {
    id: string;
    name: string;
    stock: number;
    price: number;
    author: Author;
}

export interface Author {
    id: string;
    name: string;
}

//Actions
interface AddBookAction {
    type: 'ADD_BOOK';
}

interface EditBookAction {
    type: 'EDIT_BOOK';
}

type KnownAction = AddBookAction | EditBookAction;

//Action Creator
export const actionCreators = {
    addBookAction: (book: BookStateProps): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        console.log(book as BookStateProps);
        if (appState) {
            fetch(`https://localhost:44396/api/Book`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(book)
            })

        }
    }
};

const unloadedState: BookState = { book: { id: "0", name: "", stock: 0, price: 0, author: { id: "0", name: "" } as Author }, redirect: false };

export const reducer: Reducer<BookState> = (
    state: BookState | undefined,
    incomingAction: Action
): BookState => {

    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'ADD_BOOK':
            return {
                book: state.book,
                redirect: false
            };
        case 'EDIT_BOOK':
            return {
                book: state.book,
                redirect: false
            };
        default: {
            return state;
        }
    }

}

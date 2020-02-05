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
    book: BookStateProps;
    redirect: any;
}

interface EditBookAction {
    type: 'EDIT_BOOK';
    book: BookStateProps;
    redirect: any;
}

interface DeleteBookAction {
    type: 'DELETE_BOOK';
    bookId: string;
    redirect: any;
}

type KnownAction = AddBookAction | EditBookAction | DeleteBookAction;

//Action Creator
export const actionCreators = {
    addBookAction: (book: BookStateProps, redirect: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState) {
            fetch(`https://localhost:44396/api/Book`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(book)
            })
            .then(redirect)

            dispatch({ type: 'ADD_BOOK', book: book, redirect: redirect });
        }
    },
    deleteBookAction: (bookId: string, redirect: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState) {
            fetch(`https://localhost:44396/api/Book/` + bookId, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'DELETE',
            })
            .then(redirect)


            dispatch({ type: 'DELETE_BOOK', bookId: bookId, redirect: redirect});
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
            return  Object.assign({},{
                book: state.book,
                redirect: state.redirect
            });
        case 'EDIT_BOOK':
            return  Object.assign({},{
                book: state.book,
                redirect: state.redirect
            });
        case 'DELETE_BOOK':
            return  Object.assign({},{
                book: state.book,
                redirect: state.redirect
            });
        default: {
            return state;
        }
    }

}

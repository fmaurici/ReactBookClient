import { Action, Reducer } from 'redux';
import { AppThunkAction } from '..';
import { BookState, BookStateProps } from './Book';
// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface BookListState {
    booksState: BookState[];
    isLoading: boolean;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface GetAllBooksAction {
    type: 'REQUEST_BOOKS';
}

interface ReceiveAllBooksAction {
    type: 'RECEIVE_BOOKS';
    booksState: BookState[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = GetAllBooksAction | ReceiveAllBooksAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    //I can send parameters inside the brackets -> getAllBooksAction (parameterName: type)
    getAllBooksAction: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.bookList) {
            fetch(`https://localhost:44396/api/Book`)
                .then(response => response.json() as Promise<BookStateProps[]>)
                .then(data => {
                    //Fill BookStates to be shown
                    var bookStates : BookState[] = [];
                    data.forEach(book => {
                        const bookState = {
                            book: book,
                            redirect: false
                        } as BookState

                        bookStates.push(bookState);
                    });

                    dispatch({ type: 'RECEIVE_BOOKS', booksState: bookStates });
                });

            dispatch({ type: 'REQUEST_BOOKS'});
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: BookListState = { booksState: [], isLoading: false};

//Esto es una funcion flecha
export const reducer: Reducer<BookListState> = (
    state: BookListState | undefined,
    incomingAction: Action
): BookListState => {

    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_BOOKS':
            return {...state,
                booksState: state.booksState,
                isLoading: true,
            };
        case 'RECEIVE_BOOKS':
            return  {...state,
                booksState: action.booksState,
                isLoading: true,
            };
        default: {
            return state;
        }
    }

};
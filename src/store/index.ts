import * as BookList from './book/BookList';
import * as Book from './book/Book';

// The top-level state object
export interface ApplicationState {
    bookList: BookList.BookListState;
    book: Book.BookState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    bookList: BookList.reducer,
    book: Book.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}

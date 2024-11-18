import { getAllBook, getBookById, addBook, updateBook, deleteBook } from './handler.js';

export const routes = [
    {
        method: 'GET',
        path: '/books',
        handler: getAllBook, 
    },
    {
        method: 'POST',
        path: '/books',
        handler: addBook,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookById,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBook,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBook,
    }
]
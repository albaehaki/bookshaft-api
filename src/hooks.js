import { filterBooks } from './helper.js'

export const responHandler = (data) => {
    const responseData = {};
    responseData.status = data.status;
    if (data) responseData.message = data.message;
    if (data) responseData.data = data.data;
    const response = data.res.response(responseData).code(data.code);
    return response;
};


export const getBookWithQuery = (data) => {
    const { query, dataBooks, res } = data;

    // const { reading, name, finished} = query


        return responHandler({
            res: res,
            status: "success",
            data: filterBooks(dataBooks, query).length === 0? [] : {
                books: filterBooks(dataBooks, query)
            },
            // data: dataBooks.map(({id, name, publisher}) => ({
            //     id, name, publisher
            // })),
            code: 200,
          });


    
}

// data: reading !== null? "reading": finished !== null? "finnised": name !== null? "name" : "semua data buku",


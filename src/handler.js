import { nanoid } from "nanoid";
import books from "./books.js";

//hooks
import { responHandler, getBookWithQuery } from "./hooks.js";
//helper
import { valueIsValidBook } from "./helper.js";

export const addBook = (req, res) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  const finished = readPage === pageCount;
  const id = nanoid(16);
  const createAt = new Date().toISOString();
  const updateAt = createAt;

  // Menambahkan book baru
  if (
    !valueIsValidBook({
      name: name,
      readPage: readPage,
      pageCount: pageCount,
      options: "all",
    })
  ) {
    const book = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      createAt,
      updateAt,
    };
    books.push(book);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
      return responHandler({
        res: res,
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: { bookId: id },
        code: 201,
      });
    } else {
      return responHandler({
        res: res,
        status: "fail",
        message: "Buku gagal ditambahkan",
        code: 400,
      });
    }
  } else {
    return responHandler({
      res: res,
      status: "fail",
      message: valueIsValidBook({ name: name, options: "name" })
        ? "Gagal menambahkan buku. Mohon isi nama buku"
        : valueIsValidBook({
            readPage: readPage,
            pageCount: pageCount,
            options: "readPage",
          })
        ? "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        : "",
      code: 400,
    });
  }
};

//Mengambil keselurihan data books
export const getAllBook = async (req, res) => {
  const query = req.query;

  return await getBookWithQuery({query: query, res: res, dataBooks: books});

  // return reading
  // return responHandler({ res: res, status: "success", data: books, code: 200 });
  // const responseData = {};
  // responseData.status = "success";
  // responseData.data = books.map(({ id, name, publisher }) => ({
  //   id,
  //   name,
  //   publisher,
  // }));
  // const response = res.response(responseData).code(200);
  // return {
  //   status: "success",
  //   data: {
  //     books: books.map(({ id, name, publisher }) => ({
  //       id,
  //       name,
  //       publisher,
  //     })),
  //   },
  // };
};

//Mengambil data detail book
export const getBookById = (req, res) => {
  const bookId = req.params.bookId;
  const book = books.find((book) => book.id === bookId);

  if (book !== undefined) {
    return responHandler({
      res: res,
      status: "success",
      data: book,
      code: 200,
    });
  } else {
    return responHandler({
      res: res,
      status: "fail",
      message: "Buku tidak ditemukan",
      code: 404,
    });
  }
};

//Mengupdate data Book
export const updateBook = (req, res) => {
  const bookId = req.params.bookId;
  const bookIndex = books.findIndex((book) => book.id === bookId);
  const updateData = req.payload;

  if (updateData !== null || updateData !== undefined) {
    if (bookIndex !== -1) {
      if (
        !valueIsValidBook({
          name: updateData.name,
          readPage: updateData.readPage,
          pageCount: updateData.pageCount,
          options: "all",
        })
      ) {
        const updatedBook = {
          ...books[bookIndex],
          ...updateData,
        };

        updatedBook.updateAt = new Date().toISOString();
        updatedBook.finished = updatedBook.readPage === updateBook.pageCount;
        books[bookIndex] = updatedBook;

        return responHandler({
          res: res,
          status: "success",
          message: "Buku berhasil diperbarui",
          code: 200,
        });
      } else {
        return responHandler({
          res: res,
          status: "fail",
          message: valueIsValidBook({ name: updateData.name, options: "name" })
            ? "Gagal menambahkan buku. Mohon isi nama buku"
            : valueIsValidBook({
                readPage: updateData.readPage,
                pageCount: updateData.pageCount,
                options: "readPage",
              })
            ? "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
            : "",
          code: 400,
        });
      }
    } else {
      return responHandler({
        res: res,
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
        code: 404,
      });
    }
  } else {
    return responHandler({
      res: res,
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi data buku",
      code: 400,
    });
  }
};

//Menghapus data book
export const deleteBook = (req, res) => {
  const bookId = req.params.bookId;
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    return responHandler({
      res: res,
      status: "success",
      message: "Buku berhasil dihapus",
      code: 200,
    });
  } else {
    return responHandler({
      res: res,
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
      code: 404,
    });
  }
};


export const valueIsValidBook = (value) => {
  const name =
    value.name === null || value.name === undefined || value.name.length === 0;
  const pageCount = value.readPage > value.pageCount;
  if (value.options === "readPage") {
    return pageCount;
  }
  if (value.options === "name") {
    return name;
  }
  if (value.options === "all") {
    return name || pageCount;
  }
};
export const filterBooks = (books, value) => {


const resultFilter = [];

if (value && Object.keys(value).length > 0) {
    for (const key in value) {
        if (key === 'reading') {
            resultFilter.push(...books.filter((book) => book.reading === (parseInt(value[key]) === 1)));
        } else if (key === 'finished') {
            resultFilter.push(...books.filter((book) => book.finished === (parseInt(value[key]) === 1)));
        } else if (key === 'name') {
            const searchTerm = value[key].toLowerCase();
            resultFilter.push(...books.filter((book) => book.name.toLowerCase().includes(searchTerm)));
        }
    }

    // Hindari pengembalian array bersarang
    const uniqueBooks = Array.from(new Set(resultFilter));

    return uniqueBooks.map(({id, name, publisher}) => ({
        id, name, publisher
    }));

} else {
    return books.map(({id, name, publisher}) => ({
        id, name, publisher
    }));
}

};

// export const filterBooks = (books, value) => {
//   // Struktur awal untuk resultFilter
//   const resultFilter = {
//       books: {},
//   };

//   if (value && Object.keys(value).length > 0) {
//       let filteredBooks = books;

//       for (const key in value) {
//           if (key === 'reading') {
//               filteredBooks = filteredBooks.filter((book) => book.reading === (parseInt(value[key]) === 1));
//           } else if (key === 'finished') {
//               filteredBooks = filteredBooks.filter((book) => book.finished === (parseInt(value[key]) === 1));
//           } else if (key === 'name') {
//               const searchTerm = value[key].toLowerCase();
//               filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(searchTerm));
//           }
//       }

//       // Simpan hasil filter ke dalam resultFilter.books sebagai objek, gunakan ID sebagai kunci
//       filteredBooks.map((book) => {
//           resultFilter.books[book.id] = {
//               id: book.id,
//               name: book.name,
//               publisher: book.publisher,
//           };
//       });

//       return resultFilter;
//   } else {
//       // Jika tidak ada filter, kembalikan semua buku dalam bentuk objek
//       books.map((book) => {
//           resultFilter.books[book.id] = {
//               id: book.id,
//               name: book.name,
//               publisher: book.publisher,
//           };
//       });

//       return resultFilter;
//   }
// };




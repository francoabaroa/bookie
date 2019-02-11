export const alphabetizeBooks = function(books) {
  const alphabet = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  const alphabetizedMap = {};
  // For any book titles starting in anything besides a letter.
  alphabetizedMap['#'] = [];

  alphabet.forEach(alphabetLetter => {
    alphabetizedMap[alphabetLetter.toUpperCase()] = [];
  });

  books.forEach(book => {
    let firstLetter = book.title[0].toUpperCase();
    if (alphabetizedMap[firstLetter]) {
      alphabetizedMap[firstLetter].push(book);
    } else {
      // For any book titles starting in anything besides a letter.
      alphabetizedMap['#'].push(book);
    }
  });
  return alphabetizedMap;
};

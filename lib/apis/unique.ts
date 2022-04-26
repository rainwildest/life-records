export default (array: any): string[] => {
  if (array.length <= 1) {
    return array;
  }

  // Turn all elements into strings, including arrays
  const stringElements: string[] = array.map((key: number | string) => JSON.stringify(key));

  // Get the unique elements by using an ES6 Set
  const filterResult = new Set(stringElements);
  const uniqueElements: string[] = [...filterResult];

  // Turn the non-string elements back into non-strings
  return uniqueElements.map((key) => {
    // If it's e.g. an array, this will return the original array
    try {
      return JSON.parse(key);
    } catch (err) {
      // Oh, it was a string after all, let's just return that.
      return key;
    }
  });
};

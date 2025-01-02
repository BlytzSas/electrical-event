export function getTwoLettersFromStr(str: string) {
  if (!str || str.length < 1) {
    return "";
  }

  const firstTwoLetters = str.slice(0, 2);

  if (firstTwoLetters.length === 0) {
    return "";
  }

  const firstLetter = firstTwoLetters.charAt(0).toUpperCase();
  const secondLetter = firstTwoLetters.slice(1);

  return firstLetter + secondLetter;
}

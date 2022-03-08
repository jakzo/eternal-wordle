export enum GuessResult {
  NOT_FOUND,
  WRONG_POS,
  CORRECT,
}

export const calculateResults = (
  word: string,
  guess: string
): GuessResult[] => {
  const correctChars = [...guess].map((ch, k) => ch === word[k]);
  const otherChars = new Set([...word].filter((_, k) => !correctChars[k]));
  return [...guess].map((ch, k) => {
    if (correctChars[k]) return GuessResult.CORRECT;
    if (!otherChars.has(ch)) return GuessResult.NOT_FOUND;
    otherChars.delete(ch);
    return GuessResult.WRONG_POS;
  });
};

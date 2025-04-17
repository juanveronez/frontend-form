export function captalizeText(text: string) {
  function captalizeWord(word: string) {
    const initial = word[0].toUpperCase();
    const rest = word.slice(1).toLowerCase();

    return `${initial}${rest}`;
  }

  const words = text.split(" ").filter(Boolean);
  const captalizedWords = words.map(captalizeWord);

  return captalizedWords.join(" ");
}

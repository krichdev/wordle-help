import { words, sortedWords } from './words';

export function wordsThatStartWith(start: string) {
  return words.filter(word => word.startsWith(start))
};

export function globalWordSearch(letterMap: Record<number, string>): string[] {
  const keys = Object.keys(letterMap).filter(key => letterMap[parseInt(key)] !== '');
  const possibleWords: string[] = [];
  sortedWords.map((word) => {
    let matchCount = 0
    keys.map((key) => {
      if (word.charAt(parseInt(key)) == letterMap[parseInt(key)].toLowerCase()) {
        matchCount++
      }
    });
    if (matchCount === keys.length) {
      possibleWords.push(word)
    }

    return null
  })
  return possibleWords
}
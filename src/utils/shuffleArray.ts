/**
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/12646864#12646864
 * @param array - The array to be shuffled
 * @returns a deep copied shuffle of the original array
 */
export function shuffleArray<T>(array: T[]) {
  return new Promise<T[]>((resolve, _) => {
    const arrayCopy = structuredClone(array);
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }

    resolve(arrayCopy);
  });
}

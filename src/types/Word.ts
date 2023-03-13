/**
 * Representation of a word object
 * @param id - unique identifier
 * @param value - the actual word
 * @param definition - dicitionary definition of the word
 * @param definitionURL - The URL of the website the word originates from.
 * @param guessed - boolean used to indicate whether this object
 * is filtered or not when used in an array
 */
export interface Word {
  id: number;
  value: string; // the actual word
  definition: string;
  definitionURL: string;
  guessed: boolean;
}

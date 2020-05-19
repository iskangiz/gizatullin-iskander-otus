
import ITranslation from "./ITranslation";

export default interface IWordWithTranslation {
  word: string;
  translations: Array<ITranslation>;
}

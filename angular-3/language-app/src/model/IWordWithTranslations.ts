
import ITranslation from "./ITranslation";

export default interface IWordWithTranslations {
  word: string;
  translations: Array<ITranslation>;
}

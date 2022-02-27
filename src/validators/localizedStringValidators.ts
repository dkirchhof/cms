import { Localized } from "../types/i18n";
import { PropValidator } from "../types/itemTypeConfig";

export const notEmpty: PropValidator<Localized<string, any>> = value => Object.values(value).some(localizedValue => localizedValue.trim() === "") ? "Text is empty" : null;
export const isEmail: PropValidator<Localized<string, any>> = value => Object.values(value).some(localizedValue => /^\S+@\S+\.\S+$/.test(localizedValue)) ? null : "Not an email";

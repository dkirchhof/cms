import { PropValidator } from "../types/itemTypeConfig";

export const notEmpty: PropValidator<string> = value => value.trim() === "" ? "Text is empty" : null;
export const isEmail: PropValidator<string> = value => /^\S+@\S+\.\S+$/.test(value) ? null : "Not an email";

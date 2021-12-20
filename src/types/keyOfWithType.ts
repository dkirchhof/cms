export type KeyOfWithType<S, T> = { [Key in keyof S]: S[Key] extends T ? Key : never; }[keyof S];

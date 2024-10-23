type GeneratePasswordType = {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  symbol: boolean;
};

const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
const NUMBER_CHARS = "0123456789";
const SYMBOL_CHARS = "!@#$%^&*()_+[]{}|;:,.<>?";

export const generateStrongPassword = ({
  length,
  uppercase,
  lowercase,
  number,
  symbol,
}: GeneratePasswordType): string => {
  let chars = "";
  if (uppercase) chars += UPPERCASE_CHARS;
  if (lowercase) chars += LOWERCASE_CHARS;
  if (number) chars += NUMBER_CHARS;
  if (symbol) chars += SYMBOL_CHARS;

  if (!chars) return "";

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars[array[i] % chars.length];
  }

  return password;
};

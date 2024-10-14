/**
 * Generate a random password with the given length.
 * @param {number} length
 * @returns {string}
 */
export const generateRandomPassword = (length: number = 12): string => {
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  const allChars = upperCase + lowerCase + digits + specialChars;
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  return password;
};

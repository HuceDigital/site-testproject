/**
 * Cleans a phone number by removing spaces, dashes, parentheses, and other formatting characters.
 * Only keeps digits and the plus sign (+) for international format.
 *
 * @param phoneNumber - The phone number to clean (e.g., "+31 6 10253581" or "+31-6102-53581")
 * @returns The cleaned phone number (e.g., "+31610253581")
 *
 * @example
 * cleanPhoneNumber("+31 6 1025 3581") // returns "+31610253581"
 * cleanPhoneNumber("+31-6102-53581") // returns "+31610253581"
 * cleanPhoneNumber("(31) 6 1025 3581") // returns "31610253581"
 */
export function cleanPhoneNumber(phoneNumber: string): string {
  // Remove spaces, dashes, parentheses, and other formatting characters except +
  return phoneNumber.replace(/[\s\-\(\)]/g, "");
}

/**
 * testData.js
 * ---------------------------------------------
 * Centralized test data for Serverest UI scenarios.
 * Includes valid and invalid users, sample product, and dynamic email generator.
 */

export const adminUser = {
  name: "Leandro",
  email: "leandrorisch4@gmail.com",
  password: "lsrgit@2025",
  isAdmin: true,
};

export const invalidUser = {
  email: "a@gmail.com",
  password: "a@gmail.com",
};

export const productSample = {
  name: "Prod 1",
  description: "Desc 1",
  price: "100",
  quantity: "10",
  imagePath: "images/image.jpg",
};

/**
 * Generates a unique email using a counter value.
 * @param {number} count - Unique number to append.
 * @returns {string} - Generated email.
 */
export function generateUniqueEmail(count) {
  return `leandrorisch4+${count}@gmail.com`;
}

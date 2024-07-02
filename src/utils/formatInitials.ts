export default function getInitials(name: string): string {
  if (!name) return "";

  const words = name.trim().split(/\s+/); // Split the name by spaces and trim any extra spaces
  if (words.length === 1) {
    // If there's only one word, return the first letter of that word
    return words[0][0].toUpperCase();
  }

  const firstInitial = words[0][0].toUpperCase(); // Get the first letter of the first word
  const lastInitial = words[words.length - 1][0].toUpperCase(); // Get the first letter of the last word

  return `${firstInitial}${lastInitial}`;
}

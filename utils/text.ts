export function capitalizeWords(text: string) {
  return text
    .split(" ")
    .map((word) =>
      word.length > 0
        ? word[0].toUpperCase() + word.slice(1)
        : word
    )
    .join(" ");
}
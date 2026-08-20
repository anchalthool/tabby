const personIcons = [
  "/icons/people/person-1.png",
  "/icons/people/person-2.png",
  "/icons/people/person-3.png",
  "/icons/people/person-4.png",
  "/icons/people/person-5.png",
  "/icons/people/person-6.png",
  "/icons/people/person-7.png",
  "/icons/people/person-8.png",
];

function hashName(name: string) {
  let total = 0;

  for (let i = 0; i < name.length; i++) {
    total += name.charCodeAt(i);
  }

  return total;
}

export function getPersonIcon(name: string) {
  const index = hashName(name) % personIcons.length;
  return personIcons[index];
}
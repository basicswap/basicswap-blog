export interface Author {
  name: string;
  bio: string;
  avatar: string;
}

export const authors: { [key: string]: Author } = {
  "BasicSwap Team": {
    name: "BasicSwap Team",
    bio: "The official team behind BasicSwap. We're a group of passionate contributors dedicated to making atomic swap technology ubiquitous by creating accessible, user-friendly solutions for everyone.",
    avatar: "/images/authors/basicswap-bsx-emblem.png",
  },
  "Cryptoguard": {
    name: "Cryptoguard",
    bio: "A passionate contributor to BasicSwap, dedicated to decentralization, privacy, and digital security.",
    avatar: "/images/authors/cryptoguard.png",
  },
  "Cangrejo": {
    name: "Cangrejo",
    bio: "A passionate contributor to BasicSwap, dedicated to decentralization, privacy, and digital security.",
    avatar: "/images/authors/cangrejo.jpg",
  },
};

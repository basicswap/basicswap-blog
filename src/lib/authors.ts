export interface Author {
  name: string;
  bio: string;
  avatar: string;
}

export const authors: { [key: string]: Author } = {
  "BasicSwap Team": {
    name: "BasicSwap Team",
    bio: "The official team behind BasicSwap, dedicated to decentralized trading and atomic swaps.",
    avatar: "/images/authors/basicswap-bsx-emblem.png",
  },
  "Cryptoguard": {
    name: "Cryptoguard",
    bio: "A passionate contributor to BasicSwap, dedicated to decentralization, privacy, and digital security.",
    avatar: "/images/authors/cryptoguard.png",
  },
};

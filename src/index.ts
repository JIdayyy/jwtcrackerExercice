import { sign, verify } from "jsonwebtoken";

const jwtToDecode = sign(
  {
    flag: "flag{this_is_the_flag}",
  },
  "iiii"
);

const chars = "abcdefghijklmnopqrstuvwxyz".split("");

function generateKeys(chars: string[], length: number): string[] {
  const keys = [];
  for (let i = 0; i < chars.length; i++) {
    for (let j = 0; j < length; j++) {
      const key = [];
      while (key.length <= j) {
        key.push(chars[i]);
      }
      if (key.length) {
        keys.push(key.join(""));
      }
    }
  }
  return keys;
}

const allKeys = generateKeys(chars, 4);

allKeys.forEach((key) => {
  verify(jwtToDecode, key, (err, decoded) => {
    if (decoded) {
      console.log(decoded);
      console.log(key);
    }
  });
});

type T = {
  readonly a: string;
  b?: string;
};

// Note b is optional
const sameAsT: { [K in keyof T]: string } = {
  a: "asdf" // a is required
};

// Note a became optional
const canBeNotPresent: { [K in keyof T]?: string } = {};

// Note b became required
const mustBePreset: { -readonly [K in keyof T]-?: string } = {
  a: "asdf",
  b: "asdf" // b became required
};

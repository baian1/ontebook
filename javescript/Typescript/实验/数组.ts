const data = [{ key: "hello" }, { key: "world" }] as const;

type transform<T extends readonly { readonly key: string }[]> = {
  [P in T[number]["key"]]: string;
};

type res = transform<typeof data>;

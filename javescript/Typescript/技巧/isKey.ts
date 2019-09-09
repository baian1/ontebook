function isKey<E> (str : string | number | symbol) : str is keyof E {
  return true;
}

function isKey<E>(str: string): str is Extract<keyof E, string> {
  return true;
}
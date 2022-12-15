export const contains = (root: Node | null | undefined, n?: Node): boolean => {
  if (!root) {
    return false;
  }

  return root.contains(n);
};

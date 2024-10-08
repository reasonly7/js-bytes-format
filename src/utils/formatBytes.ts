export const formatBytes = (bytes: string | bigint | number) => {
  try {
    bytes = BigInt(bytes);
    if (bytes < 0n) {
      throw new Error();
    }
  } catch {
    throw new Error(
      "Invalid input: `bytes` must be an integer, BigInt, or an integer string, and they all must be non-negative"
    );
  }

  if (bytes === 0n) {
    return "0 B";
  }

  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]; // and more ...
  const K = 1024n;
  let i = 0n;
  const originBytes = bytes;
  while (bytes >= K && i < sizes.length - 1) {
    bytes /= K;
    i++;
  }

  const intPart = bytes;
  const level = K ** i;
  const decimalPart = originBytes - level * intPart;
  const num = Number(intPart) + Number((decimalPart * 1000n) / level) / 1000;

  if (num > Number.MAX_SAFE_INTEGER) {
    throw new Error(
      `Invalid input: \`bytes\` exceeds the maximum precise value that ${
        sizes[sizes.length - 1]
      } can represent`
    );
  }

  return `${num.toFixed(2)} ${sizes[Number(i)]}`;
};

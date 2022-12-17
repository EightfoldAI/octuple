export function validProgress(progress: number | undefined): number {
  if (!progress || progress < 0) {
    return 0;
  }
  if (progress > 100) {
    return 100;
  }
  return progress;
}

export function getSuccessPercent({
  success,
  successPercent,
}: {
  success?: {
    progress?: number;
    percent?: number;
  };
  successPercent?: number;
}) {
  let percent = successPercent;
  if (success && 'percent' in success) {
    percent = success.percent;
  }
  return percent;
}

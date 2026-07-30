export interface RecapRecord {
  year: number;
}

export interface RecapNavigation<T extends RecapRecord> {
  recaps: T[];
  recapsDescending: T[];
  firstYear: number | undefined;
  latestYear: number | undefined;
  pendingYear: number | undefined;
}

export function deriveRecapNavigation<T extends RecapRecord>(
  records: readonly T[],
  now: Date,
): RecapNavigation<T> {
  const recaps = [...records].sort((a, b) => a.year - b.year);
  const firstYear = recaps.at(0)?.year;
  const latestYear = recaps.at(-1)?.year;
  const nextUnpublishedYear = latestYear === undefined ? undefined : latestYear + 1;
  const pendingYear =
    nextUnpublishedYear !== undefined && now.getFullYear() >= nextUnpublishedYear
      ? nextUnpublishedYear
      : undefined;

  return {
    recaps,
    recapsDescending: recaps.toReversed(),
    firstYear,
    latestYear,
    pendingYear,
  };
}

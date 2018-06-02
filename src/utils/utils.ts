export function swap(array: number[], firstIndex: number, secondIndex: number): void {
    if (firstIndex === secondIndex) return;

    [array[firstIndex], array[secondIndex]] = [array[secondIndex], array[firstIndex]];
}

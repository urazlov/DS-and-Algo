function binarySearch(numbers: number[], k: number) {
	let lo = 0;
	let hi = numbers.length;

	while (lo < hi) {
		let mid = Math.floor(lo + (hi - lo) / 2);
		let v = numbers[mid];

		if (v === k) {
			return true;
		} else if (k > v) {
			lo = mid + 1;
		} else {
			hi = mid;
		}
	}
	return false;
}

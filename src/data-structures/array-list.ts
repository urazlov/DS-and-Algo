interface ArrayList<T> {
	/**
	 * Добавляет элемент в конец списка
	 * @param item
	 */
	add: (item: T) => void;
	/**
	 * Добавляет элемент в начало списка
	 * @param item
	 */
	addToStart: (item: T) => void;
	/**
	 * Удаляет элемент по индексу
	 * @param index
	 * @returns Удаленный элемент или undefined, если индекс неверный
	 */
	remove: (index: number) => T | undefined;
	/**
	 * Возвращает элемент по индексу
	 * @param index
	 * @returns Элемент или undefined, если индекс неверный
	 */
	get: (index: number) => T | undefined;
	/**
	 * Длина списка
	 */
	length: number;
}

class ArrayListBuilder<T> implements ArrayList<T> {
	private items: T[];
	private capacity: number;
	public length: number;

	/**
	 * Начальная емкость списка
	 * @param initialCapacity
	 */
	constructor(initialCapacity: number = 3) {
		this.items = new Array(initialCapacity);
		this.length = 0;
		this.capacity = initialCapacity;
	}

	private resize(newCapacity: number): void {
		const newItems = new Array(newCapacity);
		for (let i = 0; i < this.length; i++) {
			newItems[i] = this.items[i];
		}

		this.items = newItems;
		this.capacity = newCapacity;
	}

	add(item: T): void {
		if (this.length === this.capacity) {
			this.resize(this.capacity * 2);
		}

		this.items[this.length] = item;
		this.length++;
	}

	remove(index: number): T | undefined {
		if (index < 0 || index >= this.length) {
			throw new Error('Index out of bounds');
		}

		const item = this.items[index];

		for (let i = index; i < this.length - 1; i++) {
			this.items[i] = this.items[i + 1];
		}

		this.items[this.length - 1] = undefined as unknown as T;
		this.length--;

		if (this.length > 0 && this.length === this.capacity / 4) {
			this.resize(this.capacity / 2);
		}

		return item;
	}

	get(index: number): T | undefined {
		if (index < 0 || index >= this.length) {
			throw new Error('Index out of bounds');
		}

		return this.items[index];
	}

	addToStart(item: T): void {
		if (this.items.length === this.capacity) {
			this.resize(this.capacity * 2);
		}

		for (let i = this.length; i > 0; i--) {
			this.items[i] = this.items[i - 1];
		}

		this.items[0] = item;
		this.length++;
	}
}

const arrayList = new ArrayListBuilder<number>(3);
arrayList.add(1);
arrayList.add(2);
arrayList.add(3);
arrayList.add(4);
arrayList.addToStart(0);
console.log(arrayList);

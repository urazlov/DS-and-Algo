interface RingBuffer<T> {
	/**
	 * Добавляет элемент в буфер.
	 * Если буфер заполнен, перезаписывает старые элементы.
	 * @param item Элемент для добавления
	 */
	enqueue(item: T): void;

	/**
	 * Удаляет и возвращает элемент из буфера.
	 * Если буфер пуст, возвращает undefined.
	 * @returns Элемент или undefined, если буфер пуст
	 */
	dequeue(): T | undefined;

	/**
	 * Возвращает текущий размер буфера.
	 * @returns Размер буфера
	 */
	length: number;

	/**
	 * Возвращает элемент по индексу, начиная с головы буфера.
	 * Если индекс неверный, возвращает undefined.
	 * @param index Индекс элемента
	 * @returns Элемент или undefined, если индекс неверный
	 */
	get(index: number): T | undefined;
}

class RingBufferBuilder<T> implements RingBuffer<T> {
	private buffer: T[];
	private capacity: number;
	private head: number;
	private tail: number;
	private size: number;

	/**
	 * Размер буфера
	 * @param capacity
	 */
	constructor(capacity: number) {
		this.capacity = capacity;
		this.buffer = new Array(capacity);
		this.head = 0;
		this.tail = 0;
		this.size = 0;
	}

	get length(): number {
		return this.size;
	}

	enqueue(item: T): void {
		if (this.size === this.capacity) {
			this.head = (this.head + 1) % this.capacity;
		} else {
			this.size++;
		}

		this.buffer[this.tail] = item;
		this.tail = (this.tail + 1) % this.capacity;
	}

	dequeue(): T | undefined {
		if (this.size === 0) {
			return undefined;
		}

		const item = this.buffer[this.head];
		this.buffer[this.head] = undefined as T;
		this.head = (this.head + 1) % this.capacity;
		this.size--;
		return item;
	}

	get(index: number): T | undefined {
		if (index < 0 || index >= this.size) {
			return undefined;
		}
		return this.buffer[(this.head + index) % this.capacity];
	}
}

const ringBuffer = new RingBufferBuilder(3);
ringBuffer.enqueue(1);
ringBuffer.enqueue(2);
ringBuffer.enqueue(3);
ringBuffer.enqueue(4);
console.log(ringBuffer);
ringBuffer.dequeue();
console.log(ringBuffer);
console.log(ringBuffer.get(0));

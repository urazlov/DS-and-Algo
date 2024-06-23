interface Queue<T> {
	/**
	 * Добавляет элемент в очередь
	 * @param item
	 */
	enqueue: (item: T) => void;
	/**
	 * Удаляет элемент из очереди
	 * @returns Элемент или undefined, если очередь пустая
	 */
	dequeue: () => T | undefined;
	/**
	 * Возвращает текущий элемент в очереди
	 * @returns Элемент или undefined, если очередь пуста
	 */
	peek: () => T | undefined;
	/**
	 * Длина очереди
	 */
	length: number;
}

type QueueNode<T> = {
	value: T;
	next?: QueueNode<T>;
};

class QueueBuilder<T> implements Queue<T> {
	public length: number;
	private head?: QueueNode<T>;
	private tail?: QueueNode<T>;

	constructor() {
		this.length = 0;
		this.head = this.tail = undefined;
	}

	enqueue(item: T) {
		const newNode: QueueNode<T> = { value: item, next: undefined };

		if (this.tail) {
			this.tail.next = newNode;
			this.tail = newNode;
		} else {
			this.tail = this.head = newNode;
		}

		this.length++;
	}

	dequeue(): T | undefined {
		const item = this.head?.value;
		this.head = this.head?.next;

		this.length--;

		return item;
	}

	peek(): T | undefined {
		return this.head?.value;
	}
}

const queue = new QueueBuilder<string>();
queue.enqueue('1');
queue.enqueue('2');
queue.enqueue('3');
console.log(queue);

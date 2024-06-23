interface LinkedList<T> {
	/**
	 * Возвращает длинну списка.
	 */
	get length(): number;
	/**
	 * Вставляет значение по индексу в список
	 * @param item Значение
	 * @param index Индекс
	 */
	insertAt(item: T, index: number): void;
	/**
	 * Удаляет элемент по указанному ключу
	 * @param comparator функция сравнения, в которую передается какой либо ключ.
	 * @return Значение элемента или null, если элемента с таким значеним нет.
	 */
	remove(comparator: (value: T) => boolean): T | null;
	/**
	 * Удаляет элемент из списка по индексу
	 * @param index Индекс удаляемого элемента
	 * @return Значение элемента или null, если элемент не найден.
	 */
	removeAt(index: number): T | null;
	/**
	 * Добавляет элемент в конец списка.
	 * @param item
	 */
	append(item: T): void;
	/**
	 * Добавляет элемент в начало списка.
	 * @param item Элемент для добавления.
	 */
	preappend(item: T): void;
	/**
	 * Возвращает элемент по индексу.
	 * @param index Индекс элемента.
	 * @returns Значение элемента или null, если индекс находится за пределами диапазона.
	 */
	get(index: number): T | null;
}

interface NodeListItem<T> {
	value: T;
	next: NodeListItem<T> | null;
	prev: NodeListItem<T> | null;
}

class NodeLinkedList<T> implements LinkedList<T> {
	private head: NodeListItem<T> | null = null;
	private tail: NodeListItem<T> | null = null;
	private _length: number = 0;

	get length(): number {
		return this._length;
	}

	append(item: T): void {
		const newNode: NodeListItem<T> = { value: item, next: null, prev: null };

		if (this.tail) {
			this.tail.next = newNode;
			newNode.prev = this.tail;
			this.tail = newNode;
		} else {
			this.tail = newNode;
			this.head = newNode;
		}

		this._length++;
	}

	preappend(item: T): void {
		const newNode: NodeListItem<T> = { value: item, next: null, prev: null };

		if (this.head) {
			newNode.next = this.head;
			this.head.prev = newNode;
			this.head = newNode;
		} else {
			this.tail = newNode;
			this.head = newNode;
		}

		this._length++;
	}

	get(index: number): T | null {
		if (index < 0 || index >= this._length) {
			return null;
		}

		let count = 0;
		let node = this.head;
		while (node && count < index) {
			count++;
			node = node.next;
		}

		return node ? node.value : null;
	}

	remove(comparator: (value: T) => boolean): T | null {
		let node = this.head;
		while (node) {
			if (comparator(node.value)) {
				if (node.prev) {
					node.prev.next = node.next;
				} else {
					this.head = node.next;
				}

				if (node.next) {
					node.next.prev = node.prev;
				} else {
					this.tail = node.prev;
				}

				this._length--;
				return node.value;
			}

			node = node.next;
		}

		return null;
	}

	removeAt(index: number): T | null {
		if (index < 0 || index >= this._length) {
			return null;
		}

		let node = this.head;
		let count = 0;

		while (node && count < index) {
			count++;
			node = node.next;
		}

		if (node) {
			if (node.prev) {
				node.prev.next = node.next;
			} else {
				this.head = node.next;
			}

			if (node.next) {
				node.next.prev = node.prev;
			} else {
				this.tail = node.prev;
			}

			this._length--;
			return node.value;
		}

		return null;
	}

	insertAt(item: T, index: number): void {
		if (index < 0 || index > this._length) {
			throw 'Index out of range';
		}

		if (index === 0) {
			this.preappend(item);
			return;
		}

		if (index === this._length) {
			this.append(item);
			return;
		}

		let count = 0;
		let node = this.head;

		while (node && count < index) {
			count++;
			node = node.next;
		}

		if (node) {
			const newNode: NodeListItem<T> = { value: item, next: null, prev: null };

			newNode.next = node;
			newNode.prev = node.prev;
			node.prev!.next = newNode;
			node.prev = newNode;
			this._length++;
		} else {
			throw "This element doesn't exist";
		}
	}
}

const list = new NodeLinkedList<{ name: string }>();
list.append({ name: 'First' });
list.append({ name: 'Second' });
list.append({ name: 'Third' });
list.preappend({ name: 'Null' });
list.insertAt({ name: 'Inserted' }, 2);
console.log(list.get(0));
console.log(list.get(1));
console.log(list.get(2));
console.log(list.get(3));
console.log(list.get(4));

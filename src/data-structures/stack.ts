interface Stack<T> {
	/**
	 * Добавляет элемент в стек
	 * @param item
	 */
	push: (item: T) => void;
	/**
	 * Удаляет элемент из стека
	 * @returns Элемент или undefined, если стек пустой
	 */
	pop: () => T | undefined;
	/**
	 * Возвращает текущий элемент в стеке
	 * @returns Элемент или undefined, если стек пустой
	 */
	peek: () => T | undefined;
	/**
	 * Длина стека
	 */
	length: number;
}

type StackNode<T> = {
	value: T;
	prev?: StackNode<T>;
};

class StackBuilder<T> implements Stack<T> {
	public length: number;
	private head?: StackNode<T>;

	constructor() {
		this.length = 0;
		this.head = undefined;
	}
	push(item: T): void {
		const newNode: StackNode<T> = { value: item, prev: this.head };
        this.head = newNode;
		this.length++;
	}

	pop(): T | undefined {
		if (!this.head) return undefined;
		const cur = this.head?.value;
		this.head = this.head?.prev;
		this.length = Math.max(0, this.length - 1);
		return cur;
	}

	peek(): T | undefined {
		return this.head?.value;
	}
}

const stack = new StackBuilder<string>();
stack.push('1');
stack.push('2');
stack.push('3');
console.log(stack);
stack.pop();
console.log(stack);
stack.push('3');
console.log(stack);

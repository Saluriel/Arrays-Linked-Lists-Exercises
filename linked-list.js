/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);

    // if there's no head make the new node the head and tail since it's the only thing in the list
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    }
    // if there is a head already, set the new node as the tail
    else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length += 1
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);
    // if the head is null set the new node as the head
    if (this.head === null) {
      this.head = newNode;
    }
    // otherwise set the node after the new node to be the old head
    else {
      newNode.next = this.head;
      this.head = newNode;
    }

    // if the legnth is 0 the head and tail are the same
    if (this.length === 0) {
      this.tail = this.head;
    }
    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    let originalTail = this.tail;
    let nextNode = this.head.next;
    let secondToLastNode = nextNode;

    if (nextNode === this.tail) {
      this.tail = this.head
      this.length -= 1;
      return originalTail.val;
    }

    if (this.tail === this.head) {
      this.tail = null;
      this.head = null;
      this.length -= 1;
      return originalTail.val
    }


    while (nextNode.next) {
      console.log("in while")
      secondToLastNode = nextNode
      nextNode = nextNode.next
    }

    this.tail = secondToLastNode
    this.length -= 1;
    return originalTail.val;

  }

  /** shift(): return & remove first item. */

  shift() {
    let originalHead = this.head.val;
    this.head = this.head.next;
    this.length -= 1;
    if (this.length < 2) {
      this.tail = this.head
    }
    return originalHead;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Index doesn't exist")
    }
    // find the head
    let currentNum = this.head;
    // set the index/count of items in list to 0
    let count = 0;

    // while the current node isn't null and the count isn't equal to the index, add 1 to the count and set the current node to the next node
    while (currentNum !== null && count != idx) {
      count += 1;
      currentNum = currentNum.next;
    }

    // return the value of the current node at the index we gave
    return currentNum.val;
  }



  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Index doesn't exist")
    }

    let currentNum = this.head;
    let count = 0;

    while (currentNum !== null && count != idx) {
      count += 1;
      currentNum = currentNum.next;
    }

    currentNum.val = val;

  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    // console.log("length", this.length)
    // console.log("index", idx)
    if (idx > this.length || idx < 0) {
      throw new Error("Index doesn't exist")
    }

    if (idx === 0) {
      return this.unshift(val);
    }

    if (idx === this.length) {
      return this.push(val);
    }

    let currentNum = this.head;
    let count = 0;

    while (currentNum !== null & count != idx - 1) {
      count += 1;
      currentNum = currentNum.next;
    }

    // console.log("current number", currentNum)
    // console.log("next number", currentNum.next)

    let newNode = new Node(val);
    // console.log('new node', newNode)
    newNode.next = currentNum.next;
    currentNum.next = newNode;
    this.length += 1;

  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    // if the index given is greater than or equal to the length of the list, or the index is less than 0, throw an error
    if (idx > this.length || idx < 0) {
      throw new Error("Index does not exist")
    }

    if (idx === 0) {
      let originalHead = this.head.val;

      this.head = this.head.next;
      this.length -= 1;

      if (this.length < 2) {
        this.tail = this.head
      }
      return originalHead;
    }

    let currentNum = this.head;
    let count = 0;

    while (currentNum !== null & count != idx - 1) {
      count += 1;
      currentNum = currentNum.next;
    }

    if (idx === this.length - 1) {
      console.log("currentNum", currentNum)
      console.log('nextcurNum', currentNum.next)
      let itemToRemove = currentNum.next
      currentNum.next = null;
      this.tail = currentNum;
      this.length -= 1;
      return itemToRemove;
    }

    let itemToRemove = currentNum.next;
    currentNum.next = currentNum.next.next;
    this.length -= 1;
    return itemToRemove;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) {
      return 0;
    }

    let total = 0;
    let currentNum = this.head;

    while (currentNum) {
      total += currentNum.val;
      currentNum = currentNum.next;
    }

    return total / this.length;
  }

}

module.exports = LinkedList;

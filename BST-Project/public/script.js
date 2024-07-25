class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(node, value) {
    if (!node) {
      return null;
    }

    if (value < node.value) {
      node.left = this.deleteNode(node.left, value);
      return node;
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value);
      return node;
    } else {
      if (!node.left && !node.right) {
        return null;
      } else if (!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      } else {
        const minNode = this.findMinNode(node.right);
        node.value = minNode.value;
        node.right = this.deleteNode(node.right, minNode.value);
        return node;
      }
    }
  }

  findMinNode(node) {
    if (!node.left) {
      return node;
    } else {
      return this.findMinNode(node.left);
    }
  }

  search(value) {
    return this.searchNode(this.root, value);
  }

  searchNode(node, value) {
    if (!node) {
      return false;
    }

    if (value < node.value) {
      return this.searchNode(node.left, value);
    } else if (value > node.value) {
      return this.searchNode(node.right, value);
    } else {
      return true;
    }
  }

  inorder() {
    const result = [];
    this.inorderTraverse(this.root, result);
    return result;
  }

  inorderTraverse(node, result) {
    if (node) {
      this.inorderTraverse(node.left, result);
      result.push(node.value);
      this.inorderTraverse(node.right, result);
    }
  }
}

// Initialize the BST
const bst = new BST();

// DOM Elements
const valueInput = document.getElementById('value-input');
const searchInput = document.getElementById('search-value');
const insertBtn = document.getElementById('insert-btn');
const deleteBtn = document.getElementById('delete-btn');
const searchBtn = document.getElementById('search-btn');
const inorderBtn = document.getElementById('inorder-btn');
const bstContainer = document.getElementById('bst-container');

// Event Listeners
insertBtn.addEventListener('click', () => {
  const value = parseInt(valueInput.value);
  if (!isNaN(value)) {
    console.log(`Inserting value: ${value}`);
    bst.insert(value);
    valueInput.value = ''; // Clear input field after insertion
    updateBSTVisualization();
  }
});

deleteBtn.addEventListener('click', () => {
  const value = parseInt(valueInput.value);
  if (!isNaN(value)) {
    console.log(`Deleting value: ${value}`);
    bst.delete(value);
    valueInput.value = ''; // Clear input field after deletion
    updateBSTVisualization();
  }
});

searchBtn.addEventListener('click', () => {
  const value = parseInt(searchInput.value);
  if (!isNaN(value)) {
    const found = bst.search(value);
    console.log(`Searching for value: ${value}`);
    if (found) {
      console.log(`Value ${value} found in the BST`);
      alert(`Value ${value} found in the BST`);
    } else {
      console.log(`Value ${value} not found in the BST`);
      alert(`Value ${value} not found in the BST`);
    }
  }
});

inorderBtn.addEventListener('click', () => {
  const result = bst.inorder();
  console.log('Inorder traversal:', result);
  // Display inorder traversal result
  alert(`Inorder traversal: ${result.join(', ')}`);
  updateBSTVisualization();
});

function updateBSTVisualization() {
  // Clear the existing visualization from bstContainer
  bstContainer.innerHTML = '';

  // Create visualization for the BST
  if (bst.root) {
    bstContainer.appendChild(createNodeElement(bst.root));
  } else {
    console.log('BST is empty');
  }
}

function createNodeElement(node) {
  const nodeElement = document.createElement('div');
  nodeElement.className = 'node';
  nodeElement.textContent = node.value;

  if (node.left) {
    const leftChild = createNodeElement(node.left);
    nodeElement.appendChild(leftChild);
  }

  if (node.right) {
    const rightChild = createNodeElement(node.right);
    nodeElement.appendChild(rightChild);
  }

  return nodeElement;
}

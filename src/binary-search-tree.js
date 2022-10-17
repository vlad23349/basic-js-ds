const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = addToTree(this.rootNode, data);

    function addToTree(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (data > node.data) {
        node.right = addToTree(node.right, data);
      } else {
        node.left = addToTree(node.left, data);
      }

      return node;
    }
  }

  has(data) {
    return findNode(this.rootNode, data);
    function findNode(node, data) {
      if (!node) {
        return false;
      }

      if (data === node.data) return true;

      if (data > node.data) {
        return findNode(node.right, data);
      } else {
        return findNode(node.left, data);
      }
    }
  }

  find(data) {
    if (this.has(data)) {
      let node = this.rootNode;

      while (node) {
        if (data === node.data) return node;
        if (data > node.data) node = node.right;
        else node = node.left;
      }
    } else return null;
  }

  remove(data) {
    this.rootNode = removeNode(this.rootNode, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;

        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    if (this.rootNode) {
      let node = this.rootNode;

      while (node) {
        if (node.left) node = node.left;
        else return node.data;
      }
    } else return null;
  }

  max() {
    if (this.rootNode) {
      let node = this.rootNode;

      while (node) {
        if (node.right) node = node.right;
        else return node.data;
      }
    } else return null;
  }
}

module.exports = {
  BinarySearchTree,
};

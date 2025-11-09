// ======= ARRAY =======
const arrayCells = document.getElementById("array-cells");
let arr = [];

function renderArray() {
  arrayCells.innerHTML = "";
  arr.forEach((v, i) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;
    cell.textContent = v;
    arrayCells.appendChild(cell);
  });
}

document.getElementById("arr-insert").addEventListener("click", () => {
  const val = document.getElementById("arr-val").value.trim();
  const idx = document.getElementById("arr-index").value;
    if (arr.includes(val)) return alert("This value already exists in the array!");
  if (val === "") return alert("Enter a value!");
  if (idx === "") arr.push(val);
  else {
    const index = parseInt(idx);
    if (index < 0 || index > arr.length) return alert("Invalid index");
    arr.splice(index, 0, val);
  }
  renderArray();
});

document.getElementById("arr-remove").addEventListener("click", () => {
  const idx = parseInt(document.getElementById("arr-index").value);
  if (isNaN(idx) || idx < 0 || idx >= arr.length) return alert("Invalid index");
  arr.splice(idx, 1);
  renderArray();
});

document.getElementById("arr-reset").addEventListener("click", () => {
  arr = [];
  renderArray();
});

// ======= STACK =======
const stackCells = document.getElementById("stack-cells");
let stack = [];

function renderStack() {
  stackCells.innerHTML = "";
  stack.forEach((v, i) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = v;
    if (i === stack.length - 1) cell.classList.add("highlight");
    stackCells.appendChild(cell);
  });
}

document.getElementById("stack-push").addEventListener("click", () => {
  const val = document.getElementById("stack-val").value.trim();
  if (!val) return alert("Enter value!");
    if (stack.includes(val)) return alert("This value already exists in the stack!");

  stack.push(val);
  renderStack();
});

document.getElementById("stack-pop").addEventListener("click", () => {
  if (stack.length === 0) return alert("Stack empty!");
  stack.pop();
  renderStack();
});

document.getElementById("stack-clear").addEventListener("click", () => {
  stack = [];
  renderStack();
});

// ======= QUEUE =======
const queueCells = document.getElementById("queue-cells");
let queue = [];

function renderQueue() {
  queueCells.innerHTML = "";
  queue.forEach((v, i) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = v;
    if (i === 0) cell.classList.add("head");
    if (i === queue.length - 1) cell.classList.add("tail");
    queueCells.appendChild(cell);
  });
}

document.getElementById("queue-enq").addEventListener("click", () => {
  const val = document.getElementById("queue-val").value.trim();
  if (!val) return alert("Enter value!");
      if (queue.includes(val)) return alert("This value already exists in the queue!");

  queue.push(val);
  renderQueue();
});

document.getElementById("queue-deq").addEventListener("click", () => {
  if (queue.length === 0) return alert("Queue empty!");
  queue.shift();
  renderQueue();
});

document.getElementById("queue-clear").addEventListener("click", () => {
  queue = [];
  renderQueue();
});

// ======= BINARY SEARCH TREE =======
const treeSvg = document.getElementById("tree-svg");
const treeOutput = document.getElementById("tree-output");
let bstRoot = null;

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.id = "node-" + Math.random().toString(36).substr(2, 9);
  }
}

// Insert with duplicate check
function insertNode(root, val) {
  if (!root) return new TreeNode(val);
  if (val === root.val) {
    alert("This value already exists in the tree! Please enter a unique number.");
    return root;
  }
  if (val < root.val) root.left = insertNode(root.left, val);
  else root.right = insertNode(root.right, val);
  return root;
}

function removeNode(root, val) {
  if (!root) return null;
  if (val < root.val) root.left = removeNode(root.left, val);
  else if (val > root.val) root.right = removeNode(root.right, val);
  else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    let minLargerNode = root.right;
    while (minLargerNode.left) minLargerNode = minLargerNode.left;
    root.val = minLargerNode.val;
    root.right = removeNode(root.right, minLargerNode.val);
  }
  return root;
}

function inorder(root, arr = []) {
  if (!root) return arr;
  inorder(root.left, arr);
  arr.push(root.val);
  inorder(root.right, arr);
  return arr;
}

function preorder(root, arr = []) {
  if (!root) return arr;
  arr.push(root.val);
  preorder(root.left, arr);
  preorder(root.right, arr);
  return arr;
}

function postorder(root, arr = []) {
  if (!root) return arr;
  postorder(root.left, arr);
  postorder(root.right, arr);
  arr.push(root.val);
  return arr;
}

// ====== Tree Visualization ======
function renderTree() {
  treeSvg.innerHTML = "";
  treeOutput.innerHTML = "";
  if (!bstRoot) return;
   
  
  const levelSpacing = 60;
  const nodeRadius = 20;

  function getDepth(node) {
    if (!node) return 0;
    return 1 + Math.max(getDepth(node.left), getDepth(node.right));
  }
  const depth = getDepth(bstRoot);
  const width = treeSvg.clientWidth; // can be page width
  const height = Math.max(treeSvg.clientHeight, depth * levelSpacing + 500); // dynamic height

  treeSvg.setAttribute("width", width);
  treeSvg.setAttribute("height", height);

  

  // Define a gradient
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
  gradient.setAttribute("id", "bg-gradient");
  gradient.setAttribute("x1", "0%");
  gradient.setAttribute("y1", "0%");
  gradient.setAttribute("x2", "0%");
  gradient.setAttribute("y2", "100%");

  const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", "#b81cabff"); // top color
  gradient.appendChild(stop1);

  const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("stop-color", "#286db3ff"); // bottom color
  gradient.appendChild(stop2);

  defs.appendChild(gradient);
  treeSvg.appendChild(defs);

  // Background rectangle using gradient
  const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  bg.setAttribute("x", 0);
  bg.setAttribute("y", 0);
  bg.setAttribute("width", width);
  bg.setAttribute("height", height);
  bg.setAttribute("fill", "url(#bg-gradient)"); // use the gradient
  treeSvg.appendChild(bg);
 
  

  function drawNode(node, x, y, parentX = null, parentY = null, level = 0) {
    if (!node) return;

    // Draw edge
    if (parentX !== null && parentY !== null) {
      const edge = document.createElementNS("http://www.w3.org/2000/svg", "line");
      edge.setAttribute("x1", parentX);
      edge.setAttribute("y1", parentY);
      edge.setAttribute("x2", x);
      edge.setAttribute("y2", y);
      edge.setAttribute("stroke", "#c9b21dff");
      edge.setAttribute("stroke-width", "3");
      treeSvg.appendChild(edge);
    }

    // Draw node circle
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("fill", "#1e3a8a");
    circle.setAttribute("stroke", "#c9b21dff");
    circle.setAttribute("stroke-width", "3");
    circle.setAttribute("r", nodeRadius);
    circle.setAttribute("class", "node");
    circle.addEventListener("click", () => {
      bstRoot = removeNode(bstRoot, node.val);
      renderTree();
    });
    treeSvg.appendChild(circle);

    // Draw label inside circle
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", x);
    label.setAttribute("y", y + 1);
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("dominant-baseline", "middle");
    label.setAttribute("fill", "#f8fafc");
    label.setAttribute("font-size", "14px");
    label.setAttribute("font-family", "Arial, sans-serif");
    label.textContent = node.val;
    treeSvg.appendChild(label);

    const horizontalSpacing = width / Math.pow(2, level + 2);
    drawNode(node.left, x - horizontalSpacing, y + levelSpacing, x, y, level + 1);
    drawNode(node.right, x + horizontalSpacing, y + levelSpacing, x, y, level + 1);
  }

  drawNode(bstRoot, width / 2, 40);
}

// ====== Event Listeners ======
document.getElementById("tree-insert").addEventListener("click", () => {
  const val = parseInt(document.getElementById("tree-val").value);
  if (isNaN(val)) return alert("Enter a valid number!");
  bstRoot = insertNode(bstRoot, val);
  renderTree();
});

document.getElementById("tree-remove").addEventListener("click", () => {
  const val = parseInt(document.getElementById("tree-val").value);
  if (isNaN(val)) return alert("Enter a valid number!");
  bstRoot = removeNode(bstRoot, val);
  renderTree();
});

document.getElementById("tree-reset").addEventListener("click", () => {
  bstRoot = null;
  renderTree();
});

document.getElementById("tree-trace").addEventListener("click", () => {
  const type = document.getElementById("tree-trav").value;
  let res = [];
  if (type === "inorder") res = inorder(bstRoot);
  else if (type === "preorder") res = preorder(bstRoot);
  else if (type === "postorder") res = postorder(bstRoot);
  treeOutput.innerHTML = `<strong>${type} traversal:</strong> ${res.join(", ")}`;
});

// ======= SAMPLE FILL & EXPORT =======
document.getElementById("fill-sample").addEventListener("click", () => {
  arr = ["A","B","C"];
  stack = ["S1","S2"];
  queue = ["Q1","Q2"];
  bstRoot = null;
  [50,30,70,20,40,60,80].forEach(v => bstRoot = insertNode(bstRoot, v));
  renderArray();
  renderStack();
  renderQueue();
  renderTree();
});

document.getElementById("export-json").addEventListener("click", () => {
  const data = { array: arr, stack, queue, bst: bstRoot };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data-structures.json";
  link.click();
});

document.getElementById("download-svg").addEventListener("click", () => {
  if (!bstRoot) return alert("No tree to download!");
  const clone = treeSvg.cloneNode(true);
  clone.setAttribute("width", 1200);  // choose a full-page width
  clone.setAttribute("height", 1200);  // choose a full-page height

  clone.querySelectorAll("circle").forEach(c => {
    c.setAttribute("style", `fill:${c.getAttribute("fill")};stroke:${c.getAttribute("stroke")};stroke-width:${c.getAttribute("stroke-width")}`);
  });
  clone.querySelectorAll("line").forEach(l => {
    l.setAttribute("style", "stroke:#c9b21dff;stroke-width:2");
  });
  clone.querySelectorAll("text").forEach(t => {
    t.setAttribute("style", `fill:${t.getAttribute("fill")};font-size:${t.getAttribute("font-size")};font-family:${t.getAttribute("font-family")}`);
  });

  const svgData = new XMLSerializer().serializeToString(clone);
  const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "bst.svg";
  link.click();
});

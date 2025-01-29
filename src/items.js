// Mock data
const items = [
  {id: 1, name: 'Omena'},
  {id: 2, name: 'Appelsiini'},
  {id: 3, name: 'Porkkana'},
  {id: 4, name: 'Mandariini'},
];


// Get all items
const getItems = (req, res) => {
  res.json(items);
};

// Get an item by id
const getItemById = (req, res) => {
  console.log('getItemById', req.params.id);
  const item = items.find((item) => item.id == req.params.id);
  console.log('item found:', item)
  // If item found, value not undefined
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({message: "Item not found"});
  }
};

// Adding an item
const addItem = (req, res) => {
  console.log('addItem request body', req.body);
  // If the request consist of 'name', add new item to table
  if (req.body.name) {
    // Generate a new id number to the new item (grater than the previous one)
    const latestId = items[items.length-1].id
    // Create a new item and add it to the items-table
    const newItem = {id: latestId + 1, name: req.body.name};
    items.push(newItem);
    res.status(201);
    return res.json({message: 'Item added.'});
  }
  res.status(400);
  return res.json({message: 'Request is missing name property.'});
};

// Modifying an item based on id
const editItem = (req, res) => {
  console.log('editItem request body', req.body);
  const item = items.find((item) => item.id == req.params.id);
  if (item) {
    item.name = req.body.name;
    res.json({message: 'Item updated.'});
  } else {
    res.status(404).json({message: "Item not found"});
  }
};

// Deleting an item based on id
const deleteItem = (req, res) => {
  console.log('deleteItem', req.params.id);
  const index = items.findIndex((item) => item.id == req.params.id);
  //console.log('index', index);
  // findIndex returns -1 if item is not found
  if (index !== -1) {
    // remove one item from array based on index
    items.splice(index, 1);
    res.json({message: 'Item deleted.'});
  } else {
    res.status(404).json({message: "Item not found"});
  }
}

export {getItems, getItemById, addItem, editItem, deleteItem};

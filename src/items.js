// Mock data
const items = [
  { id: 1, name: "Item1" },
  { id: 2, name: "Item2" },
  { id: 3, name: "Item3" },
];

// Get alla items
const getItems = (req, res) => {
  res.json(items);
};

// Getting item by using id
const getItemById = (req, res) => {
  console.log('getItemById', req.params.id);
  const item = items.find(item => item.id == req.params.id);
  // If item is found
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({message: 'Item not found'});
  };
};

// Adding a new item
const addItem = (req, res) => {
  console.log('addItem request body', req.body);
  // If request has 'name', new item will be added to items-list
  if (req.body.name) {
    // Generate id-number to new user (one bigger than the previous)
    const latestId = items[items.length-1].id
    // New item created and added to items-list
    const newItem = {id: latestId + 1, name: req.body.name};
    items.push(newItem);
    res.status(201);
    return res.json({message: 'Item added '});
  }
  res.status(400);
  return res.json({message: 'Request is missing name property'});
};

//TODO: post, put, delete
//TODO: add user.js, week material 2

export {getItems, getItemById, addItem};

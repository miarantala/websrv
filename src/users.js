const users = [
  {
    id: 1,
    username: 'johndoe',
    password: 'password1',
    email: 'johndoe@example.com',
  },
  {
    id: 2,
    username: 'janedoe',
    password: 'password2',
    email: 'janedoe@example.com',
  },
  {
    id: 3,
    username: 'bobsmith',
    password: 'password3',
    email: 'bobsmith@example.com',
  },
];

// Get all users
const getUsers = (req, res) => {
  res.json(users);
};

// TODO (kotihommia): toteuta ja testaa getUserById()

// Add new user
const addUser = (req, res) => {
  console.log('addUser request body', req.body);
  // Show 3 new variables where property values are placed
  const {username, password, email} = req.body;
  // Checking all the necessary information is ncluded in the request
  if (username && password && email) {
    // Generate a new id number to new user (grater that the previous)
    const latestId = users[users.length - 1].id;
    // Create a new user and add it to the users-table
    const newUser = {
      id: latestId + 1,
      username,
      password,
      email,
    };
    users.push(newUser);
    res.status(201);
    return res.json({message: 'User added.'});
  }
  res.status(400);
  return res.json({
    message: 'Request should have username, password and email properties.',
  });
};

// User authentication (login)
const login = (req, res) => {
  const {username, password} = req.body;
  if (!username) {
    return res.status(401).json({message: 'Username missing.'});
  }
  const user = users.find((user) => user.username === username);
  // If requested user is found and password property matches with the sent password value
  // Message is sent along with the information of the user
  if (user && user.password === password) {
    res.json({message: 'login ok', user});
  } else {
    res.status(401).json({message: 'Bad username/password.'});
  }
};

export {getUsers, addUser, login};

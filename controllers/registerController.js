const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fdPromeses = require("fs").promises;
const path = require("path");
const bycrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "user name and password are required" });
  //check for duplicates in de db
  const duplicate = usersDB.users.find(
    (person) => person.username === user.username
  );
  if (duplicate) return res.sendStatus(409);
  try {
    //encript the psw
    const hashedPwd = await bycrypt.hash(pwd, 10);
    //store the new user
    const newUser = {
      "username:": user,
      password: hashedPwd,
    };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fdPromeses.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    console.log(usersDB.users);
    res.status(201).json({ Success: `new user added successfully ${user}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };

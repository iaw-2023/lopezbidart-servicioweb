const getUsers ="SELECT * FROM users";
const getUsersById="SELECT * FROM users WHERE id= $1";
const checkUserExists="SELECT u FROM users u WHERE u.email= $1";
const addUsers= "INSERT INTO users (name, role, email, password) VALUES ($1, $2, $3, $4)";
const removeUser= "DELETE FROM users WHERE id= $1";
const updateUser= "UPDATE users SET password= $1 WHERE id=$4";

module.exports = {
    getUsers,
    getUsersById,
    addUsers,
    checkUserExists,
    removeUser,
    updateUser,
};
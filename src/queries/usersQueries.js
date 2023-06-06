const getUsers ="SELECT * FROM users";
const getUsersById="SELECT * FROM users WHERE id= $1";
const checkUserExists="SELECT u FROM users u WHERE u.email= $1";
const addUsers= "INSERT INTO users (name, role, email, password,created_at,updated_at) VALUES ($1, $2, $3, $4,$5,$6)";
const removeUser= "DELETE FROM users WHERE id= $1";
const updateUser= "UPDATE users SET password= $1,updated_at=$2 WHERE id=$3";

module.exports = {
    getUsers,
    getUsersById,
    addUsers,
    checkUserExists,
    removeUser,
    updateUser,
};
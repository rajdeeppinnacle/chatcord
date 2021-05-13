const users = [];

// Join user to chat
function userJoin(id, empName, empId, businessId) {
  const user = { id, empName, empId, businessId };

  if (!users.find(u => u.id == id)) {
    users.push(user);
  }

  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

// Get all Users
function getAllUsers() {
  return users
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  getAllUsers
};

const users= []


const addUser  = (userId, socketId) => {
    !users.some(user=>user.userId === userId) &&
        users.push({ userId, socketId });
    return users;
};

const removeUser = (socketID) => {
    user = users.filter((user) => user.socketId !== socketId);
    return users;
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

module.exports = { addUser, removeUser, getUser }; 
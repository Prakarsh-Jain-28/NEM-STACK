const id_user_map = new Map();

function setUser(id,user)
{
    id_user_map.set(id,user);
}
function getUser(id)
{
    return id_user_map.get(id);
}

module.exports = {
    setUser,
    getUser
}
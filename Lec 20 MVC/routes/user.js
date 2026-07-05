const express = require("express");
const {
    GetAllUser,
    PostUser,
    GetUserById,
    PatchUserById,
    PutUserById,
    DeleteUserById
} = require("../controllers/user");

const router = express.Router();


//router /api/users/:id
router.route("/:id")
.get(GetUserById)
.patch(PatchUserById)
.put(PutUserById)
.delete(DeleteUserById);


//router /api/users
router.route("/")
.get(GetAllUser)
.post(PostUser);


module.exports = router;
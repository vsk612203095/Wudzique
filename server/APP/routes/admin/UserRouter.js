let express = require("express");
const {
  userInsert,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
} = require("../../controllers/admin/userController");
const UserRouter = express.Router();

UserRouter.post("/insert", userInsert);
UserRouter.put("/update", updateUser);
UserRouter.delete("/delete", deleteUser);
UserRouter.get("/all", getAllUsers);
UserRouter.get("/:id", getUserById);

module.exports = UserRouter;

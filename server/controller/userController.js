import User from "../model/userModel.js";

export const create = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const { email } = newUser;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json("User already exist");
    }
    const saveData = await newUser.save();
    // res.status(200).json(saveData);
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "internal sever error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData || userData.length === 0) {
      return res.status(404).json("Users data not found");
    }
    console.log("Users Fetched");
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: "internal sever error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const Id = req.params.id;
    const userExist = await User.findById(Id);
    if (!userExist) {
      return res.status(404).json("User not found");
    }
    console.log("Got User by Id");
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ error: "internal sever error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const Id = req.params.id;
    const userExist = await User.findById(Id);
    if (!userExist) {
      return res.status(404).json("User not found");
    }
    const updatedData = await User.findByIdAndUpdate(Id, req.body, {
      new: true,
    });
    console.log("user updated");

    res.status(200).json({ message: "User Updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "internal sever error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const Id = req.params.id;
    const userExist = await User.findById(Id);
    if (!userExist) {
      return res.status(404).json("User not found");
    }
    await User.findByIdAndDelete(Id);
    console.log("User Deleted");

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "internal sever error" });
  }
};

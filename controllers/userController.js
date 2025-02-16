const UserModel = require("../models/userModel");
const fs = require("fs")

exports.createUser = async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const files = req.files.map((e) => e.filename);

    const checkUser = await UserModel.findOne({ email: email })
    if (checkUser) {
      return res.status(400).json({
        message: `user with email ${email} already exists, please use another email`
      })
    }
    const user = new UserModel({
      fullName,
      email,
      familyPictures: files
    });

    await user.save();

    res.status(201).json({
      message: "user created",
      data: user
    })
  } catch (error) {
    res.status(500).json({
      message: "internl server error" + error.message
    })
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName } = req.body
    const files = req.files.map((e) => e.filename);


    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "user not found"
      })
    };

    const data = {
      fullName,
      familyPictures: files
    };

    const oldFilepaths = user.familyPictures.map((e) => { return `./uploads/${e}` });

    if (req.files && req.files[0]) {
      oldFilepaths.forEach((path) => {
        if (fs.existsSync(path)) {
          fs.unlinkSync(path)
          const files = req.files.map((element) => element.filename)
          data.familyPictures = files
        }
      })
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, data, { new: true })
    res.status(200).json({
      message: "  User updated successfully",
      data: updatedUser
    })

  } catch (error) {
    res.status(500).json({
      message: "internal server error" + error.message
    })
  }
};

exports.getAll = async (req, res) => {
  try {
    const users = await UserModel.find();

    res.status(200).json({
      message: " Users found",
      data: users
    })

  } catch (error) {
    res.status(500).json({
      message: "internal server error" + error.message
    })
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id)
    if (!user) {
      return res.status(404).json({
        message: "Uer not found"
      })
    }
    res.status(200).json({
      message: `user with id ${id} found`,
      data: user
    })

  } catch (error) {
    res.status(500).json({
      message: "internal server error" + error.message
    })
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "user not found"
      })
    };

    const oldFilepaths = user.familyPictures.map((e) => { return `./uploads/${e}` });

    const deletedUser = await UserModel.findByIdAndDelete(id)

    if (deletedUser) {
      oldFilepaths.forEach((path) => {
        if (fs.existsSync(path)) {
          fs.unlinkSync(path)
        }
      })
    }

    res.status(200).json({
      message: "  User deleted successfully",
    })

  } catch (error) {
    res.status(500).json({
      message: "internal server error" + error.message
    })
  }
};
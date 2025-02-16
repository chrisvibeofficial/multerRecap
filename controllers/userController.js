const userModel = require('../models/user');
const fs = require('fs');

exports.createUser = async (req, res) => {
  try {
    const { fullName, gender } = req.body;
    const files = req.files.map((e) => e.filename);

    const user = new userModel({
      fullName,
      gender,
      IMG: files
    });

    await user.save();
    res.status(201).json({
      message: 'User created successfully',
      data: user
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, gender } = req.body;
    const files = req.files.map((e) => e.filename);

    const user = await userModel.findById(id)

    const data = {
      fullName,
      gender,
      IMG: files
    }

    const oldFilePath = `./images/${user.IMG.map((e)=> e.originalname)}`;

    if (req.files) {
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath)
        }
      }

    const updatedUser = await userModel.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json({
      message: 'User updated successfully',
      data: updatedUser
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}
const bcrypt = require("bcryptjs");
//models
const UserModel = require("../../models/Users");
const DoctorModel = require("../../models/Doctor");
const medicalCenterModel = require("../../models/MedicalCenter");

async function login(req, res) {
  if (req.body.userType === "patient") {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    res.status(200).send({ message: "Login successful" });
  } else if (req.body.userType === "medicalCenter") {
    const user = await medicalCenterModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    res.status(200).send({ message: "Login successful" });
  } else {
    const user = await DoctorModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    res.status(200).send({ message: "Login successful" });
  }
}

async function register(req, res) {
  if (req.body.userType === "patient") {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const newUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      address: req.body.address,
      DoB: req.body.dob,
      balance: 0,
    });

    try {
      await newUser.save();
      res.status(201).send({ message: "User created successfully" });
    } catch (err) {
      res.status(500).send({ message: "Error creating user", error: err });
    }
  } else if (req.body.userType === "medicalCenter") {
    const user = await medicalCenterModel.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const newUser = new medicalCenterModel({
      email: req.body.email,
      password: hash,
      address: req.body.address,
      description: req.body.description,
      name: req.body.name,
      DoB: req.body.dob,
      balance: 0,
    });

    try {
      await newUser.save();
      res.status(201).send({ message: "User created successfully" });
    } catch (err) {
      res.status(500).send({ message: "Error creating user", error: err });
    }
  } else {
    const user = await DoctorModel.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const newUser = new DoctorModel({
      email: req.body.email,
      password: hash,
      address: req.body.address,
      DoB: req.body.dob,
      balance: 0,
      YoE: req.body.yoe,
      worksAt: req.body.medicalCenterEmail,
    });

    try {
      await newUser.save();
      const center = await medicalCenterModel.findOne({
        email: req.body.medicalCenterEmail,
      });
      center.doctors_list.push(newUser);
      await center.save();
      res.status(201).send({ message: "User created successfully" });
    } catch (err) {
      res.status(500).send({ message: "Error creating user", error: err });
    }
  }
}

module.exports = {
  login,
  register,
};

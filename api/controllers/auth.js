import db from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const query = "SELECT * FROM USERS WHERE USERNAME = ?";
  db.query(query, [req.body.username], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length) return res.status(409).json("user already exists!");
    const salt = bcrypt.genSaltSync(10);
    const handlePassword = bcrypt.hashSync(req.body.password, salt);

    const query =
      "INSERT INTO USERS (`USERNAME`,`EMAIL`,`PASSWORD`,`NAME`, `COVERPIC`) VALUE (?, ?, ?, ?, ?)";
    const values = [
      req.body.username,
      req.body.email,
      handlePassword,
      req.body.name,
      req.body.coverPic,
    ];
    db.query(query, values, (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("user has been created!");
    });
  });
};
export const login = (req, res) => {
  const query = "SELECT * FROM USERS WHERE USERNAME = ?";
  db.query(query, req.body.username, (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(404).json("user not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      result[0].password
    );

    if (!checkPassword) return res.status(400).json("wrong password");

    const token = jwt.sign({ id: result[0].id }, "secretkey");

    const { password, ...other } = result[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};
export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("user has been logged out!");
};

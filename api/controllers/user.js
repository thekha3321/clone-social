import db from "../connect.js";
import Jwt from "jsonwebtoken";

export  const getUsers = (req, res) => {
    const userId = req.params.userId;
    const query = "SELECT * FROM users WHERE id = ?;"

    db.query(query, [userId], (err, result) => {
        if(err)  return res.status(500).json(err);
        const { password, ...info } = result[0];
        return res.json(info)
    })
}
import moment from "moment";
import db from "../connect.js";
import Jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("not logged in");

  Jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("token is not valid");

    const query = `SELECT p.*, U.ID AS USERID, NAME, PROFILEPIC FROM POSTS AS P JOIN USERS AS U ON (U.ID = P.USERID)
        LEFT JOIN RELATIONSHIPS AS R ON (P.USERID = R.FOLLOWEDUSERID) WHERE R.FOLLOWERUSERID= ? OR P.USERID = ?`;
    db.query(query, [userInfo.id, userInfo.id], (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(result);
    });
  });
};
export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("not logged in");

  Jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("token is not valid");

    const query =
      "INSERT INTO POSTS (`DESC`, `IMG`, `CREATEAT`, `USERID`) VALUES (?)";
    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];
    db.query(query, [values], (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post had been created!");
    });
  });
};

import db from "../connect.js";
import Jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req, res) => {
  const query = `SELECT C.*, U.ID AS USERID, NAME, PROFILEPIC FROM COMMENTS AS C JOIN USERS AS U ON (U.ID = C.USERID)
          WHERE C.POSTID = ?`;
  db.query(query, [req.query.postId], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result);
  });
};
export const addComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("not logged in");

  Jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("token is not valid");

    const query =
      "INSERT INTO COMMENTS (`DESC`, `CREATEAT`, `USERID`, `POSTID`) VALUES (?)";
    const values = [
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.postId,
    ];
    db.query(query, [values], (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("comment had been created!");
    });
  });
};

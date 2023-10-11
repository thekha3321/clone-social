import db from '../connect.js'
import Jwt from "jsonwebtoken";

export const getLikes = (req, res) => {
      const query =
        "SELECT userId FROM LIKES WHERE POSTID = ?";
      db.query(query, [req.query.postId], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(result.map(like => like.userId));
      });
}
export const addLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in");
  
    Jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("token is not valid");
  
      const query =
        "INSERT INTO likes (`userId`,`postId`) VALUES (?)";
        const values = [
            userInfo.id,
            req.body.postId,
          ];
      db.query(query, [values], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Post has be liked");
      });
    });
}
export const deleteLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in");
  
    Jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("token is not valid");
  
      const query =
        "DELETE FROM LIKES WHERE `USERID` = ? AND `POSTID` = ?";
      db.query(query, [ userInfo.id,req.query.postId ], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Post has been disliked");
      });
    });
}
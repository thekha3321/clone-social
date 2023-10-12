import db from "../connect.js"
import Jwt from "jsonwebtoken"

export const getRelationships = (req, res) => {
      const query =
        "SELECT followerUserId FROM relationships WHERE followedUserId = ?";
      db.query(query, [req.query.followedUserId], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(result.map(relationship => relationship.followerUserId));
      });
}
export const addRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in");
  
    Jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("token is not valid");
  
      const query =
        "INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES (?)";
        const values = [
            userInfo.id,
            req.body.userId,
          ];
      db.query(query, [values], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Following");
      });
    });
}
export const deleteRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in");
  
    Jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("token is not valid");
  
      const query =
        "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";
      db.query(query, [ userInfo.id,req.query.userId ], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Unfollowed");
      });
    });
}
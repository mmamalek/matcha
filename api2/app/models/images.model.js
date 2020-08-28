const sql = require("./db");

//Constructor
const Image = function(image) {
    this.url = image.url;
    this.user_id = image.user_id;
    //this.uploaded = image.uploaded;
}

//Add a new image
Image.addOne = (imageUrl, userID, result) => {
    sql.query("INSERT INTO images (url, user_id) VALUES (?, ?)", [imageUrl, userID], 
    (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("inserted image: ",  res);
        result(null, res.insertId);
        // sql.end();
    });
};

//FIND AN IMAGE BY ITS ID
Image.findById = (imageId, result) => {
    sql.query("SELECT * FROM images WHERE id = ?", [imageId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("inserted image: ",  res);
        result(null, res[0]);
        return;
    });
};

//USER ID USED TO RETRIEVE ALL USERS PICS
Image.findByUserId = (userId, result) => {
    sql.query("SELECT * FROM images WHERE user_id = ?", [userId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, res);
        return;
    });
};

//RETRIEVE ALL IMAGES (NO SORT)
Image.getAll = (result) => {
    sql.query("SELECT * FROM images", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, res);
        return;
    });
};

//DELETE AN IMAGE
Image.removeOne = (imageId, result) => {
    sql.query("DELETE FROM images WHERE id = ?", [imageId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, res);
        return;
    });
}

module.exports = Image;
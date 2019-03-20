const mongoose = require("mongoose");
const express = require("express")
const bodyParser = require("body-parser")
const logger = require("morgan")
const db = require("./model/gif")
const axios = require("axios");

const API_PORT = process.env.PORT || 3001;
const router = express();

router.use(express.urlencoded( { extended: false}));
router.use(express.json());
router.use(logger("dev"));


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/gifs";
mongoose.connect(MONGODB_URI, {useNewUrlParser: true });


router.get("/srch", (req, res) => {
    const giphy = {
        baseURL: "https://api.giphy.com/v1/gifs/",
        key: "&api_key=r5zJ6IQVZrTVcmo4vNJxx0r3FnDMqrPW",
        tag: "q=archer",
        type: "search?",
        limit: "&limit=15"
        };
        axios
            .get(giphy.baseURL+giphy.type+giphy.tag+giphy.key+giphy.limit)
            .then(function(response){
                // console.log(response.data.data[0])

                for( i=0; response.data.data.length; i++){
                    result = {
                        id: "",
                        url: ""
                    };

                    result.id=response.data.data[i].id
                    result.url=response.data.data[i].images.fixed_width.url;
                    
                    db.create(result) 
                        .then(function(dbgif){
                            console.log(dbgif);
                        })
                        .catch(function(err){
                            console.log(err)
                        });
                    }
                    console.log(result)
            })
            .catch(error => console.log(error));
});

router.get("/getData", (req, res) => {
    db.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  });

router.use("/api", router);

// launch our backend into a port
router.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));



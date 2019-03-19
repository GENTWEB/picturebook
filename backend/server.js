const mongoose = require("mongoose");
const express = require("express")
const bodyParser = require("body-parser")
const logger = require("morgan")
const db = require("./model/gif")
const axios = require("axios");

const API_PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded( { extended: false}));
app.use(express.json());
app.use(logger("dev"));


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/gifs";
mongoose.connect(MONGODB_URI, {useNewUrlParse: true });


app.get("/", (req, res) => {
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
                console.log(response.data)
                result = {};
                for( i=0; response.data.length; i++){
                    result.id = response.data.data.id
                    result.url = response.data.data.images.fixed_width_url
                    
                    db.gif.create(result) 
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

// app.use("/api", app);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));



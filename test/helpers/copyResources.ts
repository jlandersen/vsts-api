import fs = require("fs");

fs.mkdir("out/test/resources", (err) => {
    fs.createReadStream("test/resources/getProjects.json").pipe(fs.createWriteStream("out/test/resources/getProjects.json"));
});

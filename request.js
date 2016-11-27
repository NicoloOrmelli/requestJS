const request = require("request");
const fs = require("fs");
const baseApiUrl = "https://jsonplaceholder.typicode.com";

const getUsers = (callback) => {
    console.log("richiedendo gli utenti al server...");
    request(baseApiUrl + "/users", (error, response, body) => {
        if (!error && response.statusCode == 200) {
            console.log("risposta arrivata dal server!");
            let userlist = "";
            const users = JSON.parse(body);
            for (let i = 0; i < users.length; i++) {
                userlist += `<h1>${users[i].name}</h1>`;
            }
            callback(userlist);
        }

    });

};

getUsers((userlist) => {
    console.log("sto scrivendo il file...");
    fs.writeFile("./request/userlist.txt", userlist, (error) => {
        if (error) throw error;
        console.log("file scritto correttamente")
    });
});
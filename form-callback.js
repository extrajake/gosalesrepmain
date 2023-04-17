import {token} from './functions/netlifyEnv.js';
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
const API_KEY = "";
var data = localStorage.getItem("data");

console.log(id);


// require("dotenv").config();

// var secretKey = process.env.SECRET_KEY;
// console.log(secretKey);

const getToken = async (account_id, key) => {
    const url = `https://api.netlify.com/api/v1/accounts/${account_id}/env/${key}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "MyApp - narjune131@gmail.com",
        Authorization: "Bearer " + token,
      },
    });
    const json = await response.json();
    const value = json.values[0].value;
    return value;
  };

  let render = async () => {
    let apptoken = await getToken("jlacouvee", "APPTOKEN");
    let usertoken = await getToken("jlacouvee", "USERTOKEN");
  
  
    var headers = {
      "QB-Realm-Hostname": "gosales.quickbase.com",
      Authorization: "QB-USER-TOKEN " + usertoken,
      "QB-APP-TOKEN": apptoken,
      "Content-Type": "application/json",
    };


// var headers = {
//   "QB-Realm-Hostname": "gosales.quickbase.com",
//   Authorization: "b4zk43xsngt3xd7ximtbdbxycvc",
//   "QB-App-Token": "b4zk43xsngt3xd7ximtbdbxycvc",
//   "Content-Type": "application/json"
// };

var body = {
  from: "bsazkzsm2",
  select: [3, 6, 7, 15, 16, 17, 21, 22, 33, 42, 45, 48],
  where: "{42.EX.'" + id + "'}"
};

const xmlHttp = new XMLHttpRequest();

xmlHttp.open("POST", "https://api.quickbase.com/v1/records/query", true);
for (const key in headers) {
  xmlHttp.setRequestHeader(key, headers[key]);
}

xmlHttp.onreadystatechange = function() {
  if (xmlHttp.readyState === XMLHttpRequest.DONE) {
    const response = JSON.parse(xmlHttp.response);
    if (response.data) {
      var item = response.data[0];
      var name = item[6].value ? item[6].value.name : "";
      var image = item[21].value ? item[21].value : "";
      var rid = item[33].value ? item[33].value : "";
      document.getElementById("rid").value = rid;
      document.getElementById("rep-img").innerHTML = image;
      // document.getElementById("name").value = name;
      document.getElementById("rep-name").innerHTML = name;
      console.log(typeof rid);
    }
  }
};
xmlHttp.send(JSON.stringify(body));
$("#testform").on("submit", function(e) {
  e.preventDefault();
  var email = $("#email").val();
  var name = $("#name").val();
  var phone = $("#phone").val();
  var comments = $("#comments").val();
  var rid = $("#rid").val();
  var headers = {
    "QB-Realm-Hostname": "gosales.quickbase.com",
    Authorization: "QB-USER-TOKEN b5dge5_ph4g_0_c9g7fwvu96r3ucm42sf6dzpc36s",
    "Content-Type": "application/json"
  };
  var body = {
    to: "bsazk77pd",
    data: [
      {
        "7": {
          value: name
        },
        "8": {
          value: email
        },
        "9": {
          value: phone
        },
        "15": {
          value: rid
        },
        "21": {
          value: comments
        }
      }
    ],
    fieldsToReturn: [7]
  };
  xmlHttp.open("POST", "https://api.quickbase.com/v1/records", true);
  for (const key in headers) {
    xmlHttp.setRequestHeader(key, headers[key]);
  }

  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState === XMLHttpRequest.DONE) {
      const response = JSON.parse(xmlHttp.response);
      if (response.metadata) {
        if (response.metadata.createdRecordIds[0]) {
          swal({
            title: "Success",
            text: "Thanks, I'll call you back shortly",
            icon: "success"
          }).then(function(result) {
            // location.reload(true);
            window.location.href = "https://agent.gosales.co/cards/?id=" + id;
          });
        }
      } else {
        swal({
          title: "Error",
          text: response.message,
          icon: "error"
        });
      }
    }
  };
  xmlHttp.send(JSON.stringify(body));
});

}
render();
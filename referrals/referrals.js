import {token} from './functions/netlifyEnv.js';
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
const API_KEY = "";
var data = localStorage.getItem("data");
// var user_name = "";

// var headers = {
//     "QB-Realm-Hostname": "gosales.quickbase.com",
//     Authorization: "b4zk43xsngt3xd7ximtbdbxycvc",
//     "QB-App-Token": "b4zk43xsngt3xd7ximtbdbxycvc",
//     "Content-Type": "application/json"
// };

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

var body = {
    from: "bsazkzsm2",
    select: [3, 6, 7, 8, 15, 16, 17, 21, 33, 42, 45, 48, 49],
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
            console.log(item);
            var name = item[6].value ? item[6].value.name : "";
            // user_name = name;
            var image = item[21].value ? item[21].value : "";
            var rid = item[33].value ? item[33].value : "";
            document.getElementById("rid").value = rid;
            document.getElementById("rep-img").innerHTML = image;
            // document.getElementById("name").value = name;
            document.getElementById("rep-name").innerHTML = name;
            console.log(typeof rid);
            
            // console.log(name);
            // var comment = item[8].value ? item[8].value : "";
            // // var rev = item[17].value ? item[17].value : "";
            // var validReview = item[17].value ? item[17].value : "";
            // var image = item[21].value ? item[21].value : "";
            // var repid = item[33].value ? item[33].value : "";
            // var avg = item[48].value ? item[48].value.toFixed(2) : "";
            // // var avgCopy = item[49].value ? item[49].value : "";
            // user_name = name;
            // if (item[7].value) {
            //     document.getElementById("slaes_rep").innerHTML = item[7].value;
            //     if (item[45].value == "Active") {
            //         document.getElementById("slaes_rep").style.background = "";
            //     } else if (item[45].value == "Inactive") {
            //         document.getElementById("slaes_rep").innerHTML = "Agent Inactive";
            //     }
            // } else {
            //     document.getElementById("slaes_rep").style.display = "none";
            // }
            // document.getElementById("rep-img").innerHTML = image;
            // // document.getElementById("name").value = name;
            // document.getElementById("rating_name").innerText = name;
            // document.getElementById("rep-name").innerHTML = name;
            // document.getElementById("avg").innerHTML = avg;
            // // document.getElementById("avg").innerHTML = avgCopy;
            // document.getElementById("repid").value = repid;

        }
    }
};

xmlHttp.send(JSON.stringify(body));

$("#testform").on("submit", function(e) {
    e.preventDefault();
    var email = $("#email").val();
    var name = $("#name").val();
    var lastname = $("#last-name").val();
    var phone = $("#phone").val();
    var refname = $("#refname").val();
    var reflastname = $("#reflast-name").val();
    var refphone = $("#refphone").val();
    var refemail = $("#refemail").val();
    var notes = $("#notes").val();

        var headers = {
            "QB-Realm-Hostname": "gosales.quickbase.com",
            Authorization: "QB-USER-TOKEN b5dge5_ph4g_0_c9g7fwvu96r3ucm42sf6dzpc36s",
            "Content-Type": "application/json"
        };
        var body = {
            to: "bsrmxrub3",
            data: [
                {
                "6": {
                    value: name
                },
                "7": {
                    value: lastname
                },
                "8": {
                    value: phone
                },
                "9": {
                    value: email
                },
                "10": {
                    value: refname
                },
                "11": {
                    value: reflastname
                },
                "12": {
                    value: refphone
                },
                "13": {
                    value: refemail
                },
                "14": {
                    value: notes
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
                            text: "Referral Submitted Successfully",
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
  render()
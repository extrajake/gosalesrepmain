import {token} from './functions/netlifyEnv.js';
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
var data = localStorage.getItem("data");
var user_name = "";

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
    // from2: "bsa26ztqb",
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
            console.log(name);
            var comment = item[8].value ? item[8].value : "";
            // var rev = item[17].value ? item[17].value : "";
            var validReview = item[17].value ? item[17].value : "";
            var image = item[21].value ? item[21].value : "";
            var repid = item[33].value ? item[33].value : "";
            var avg = item[48].value ? item[48].value.toFixed(2) : "";
            // var avgCopy = item[49].value ? item[49].value : "";
            user_name = name;
            if (item[7].value) {
                document.getElementById("slaes_rep").innerHTML = item[7].value;
                if (item[45].value == "Active") {
                    document.getElementById("slaes_rep").style.background = "";
                } else if (item[45].value == "Inactive") {
                    document.getElementById("slaes_rep").innerHTML = "Agent Inactive";
                }
            } else {
                document.getElementById("slaes_rep").style.display = "none";
            }
            document.getElementById("rep-img").innerHTML = image;
            // document.getElementById("name").value = name;
            document.getElementById("rating_name").innerText = name;
            document.getElementById("rep-name").innerHTML = name;
            document.getElementById("avg").innerHTML = avg;
            // document.getElementById("avg").innerHTML = avgCopy;
            document.getElementById("repid").value = repid;
            var headerss = {
                "QB-Realm-Hostname": "gosales.quickbase.com",
                Authorization: "QB-USER-TOKEN b5dge5_ph4g_0_c9g7fwvu96r3ucm42sf6dzpc36s",
                "Content-Type": "application/json"
            };

            var body3 = {
                from: "bsa26ztqb",
                sortBy: [{
                    "fieldId": 6,
                    "order": "DESC"
                }],
                where: "{14.EX.'" + repid + "'}AND{17.EX.true}"
            };
            const xmlHttp3 = new XMLHttpRequest();
            xmlHttp3.open("POST", "https://api.quickbase.com/v1/records/query", true);
            for (const key in headerss) {
                xmlHttp3.setRequestHeader(key, headerss[key]);
            }

            xmlHttp3.onreadystatechange = function() {
                if (xmlHttp3.readyState === XMLHttpRequest.DONE) {
                    const response = JSON.parse(xmlHttp3.response);
                    if (response.data) {
                        // console.log(response.data);
                        if (response.data.length > 0) {
                            $(".last_reivew_box").show();
                            var customer_html = '<span>&ldquo;</span>' + response.data[0][8]['value'] + '<span>&rdquo;</span>';
                            $(".last_review_comment").html(customer_html);
                            $("#customer_name").text(response.data[0][9]['value']);
                            var html = "";
                                for (var i = 0; i < response.data.length; i++) {
                                    html += '<div class="row py-1" style="border-bottom:1px solid #eee">';
                                    html += '<div class="col-md-12" style="color: black">&ldquo;' + response.data[i][8]['value'] + '&rdquo;</div>';
                                    html += '<div class="col-8" style="color: grey;font-size: 0.9rem;">' + response.data[i][9]['value'] + '</div>';
                                    html += '<div class="col-4 text-right">';
                                    html += '<small style="font-style: italic;color: gray;">' + response.data[i][6]['value'] + '</small>';
                                    html += '</div>';
                                    html += '</div>';
                                }
                                if (html) {
                                    $(".other_review_section").show();
                                    $("#other_review_box").html(html);
                                } else {
                                    $(".other_review_box").hide();
                                }
                        }

                    }
                }
            };

            xmlHttp3.send(JSON.stringify(body3));

        }
    }
};

xmlHttp.send(JSON.stringify(body));

var headers = {
    "QB-Realm-Hostname": "gosales.quickbase.com",
    Authorization: "b4zk43xsngt3xd7ximtbdbxycvc",
    "QB-App-Token": "b4zk43xsngt3xd7ximtbdbxycvc",
    "Content-Type": "application/json"
};

var body = {
    from: "bsa26ztqb",
    // from2: "bsa26ztqb",
    select: [3, 6, 7, 8, 15, 16, 17],
    where: "{42.EX.'" + id + "'}"
};

const xmlHttp2 = new XMLHttpRequest();


xmlHttp2.open("POST", "https://api.quickbase.com/v1/records/query", true);
for (const key in headers) {
    xmlHttp2.setRequestHeader(key, headers[key]);
}

xmlHttp2.onreadystatechange = function() {
    if (xmlHttp2.readyState === XMLHttpRequest.DONE) {

        const response = JSON.parse(xmlHttp2.response);
        

        if (response.data) {
            console.log(xmlHttp2.response);
            var item2 = response.data[0];
            var name2 = item2[6].value ? item2[6].value.name2 : "";
            document.getElementById("latest-review").innerHTML = name2;
        }
    }
};


// xmlHttp.open("POST", "https://api.quickbase.com/v1/records/query", true);
// for (const key in headers) {
//   xmlHttp.setRequestHeader(key, headers[key]);
// }

// xmlHttp.onreadystatechange = function() {
//   if (xmlHttp.readyState === XMLHttpRequest.DONE) {
//     const response = JSON.parse(xmlHttp.response);
//   }};

//   xmlHttp.send(JSON.stringify(body));

// function pullReviews (e) {
//   e.preventDefault();

// fetch ('https://api.quickbase.com/v1/records/query'), {
//   method: 'POST',
//   headers: {'QB-Realm-Hostname': 'gosales.quickbase.com',
//           Authorization: 'b4zk43xsngt3xd7ximtbdbxycvc',
//           // 'QB-App-Token': 'b4zk43xsngt3xd7ximtbdbxycvc',
//           'Content-Type': 'application/json'
//       },
//   body: JSON.stringify({
//       from2: "bsa26ztqb",
//       select: [17],
//       where: "{42.EX.'" + id + "'}"
//   })
//   .then((res) => res.json())
//   // .then((data) => console.log(data))
//   .then(console.log(data))
// }
// }
// console.log (pullReviews);


$("#testform").on("submit", function(e) {
    e.preventDefault();
    var email = $("#email").val();
    var name = $("#name").val();
    var lastname = $("#last-name").val();
    var phone = $("#phone").val();
    var comments = $("#comments").val();
    var repid = $("#repid").val();
    var stars = $("input[name='stars']:checked").val();
    var checkbox = $("#follow-up").val();
    var checked = $("#email").required = true;
    var unchecked = $("#email").required = false;
    
    //testing checkbox

    if (checkbox = '1') {
        checked;
    } else {
        unchecked;
    }

    

    if (stars == null) {
        swal({
            title: "warning",
            text: "Select review stars.",
            icon: "warning"
        });
    } else {
        var headers = {
            "QB-Realm-Hostname": "gosales.quickbase.com",
            Authorization: "QB-USER-TOKEN b5dge5_ph4g_0_c9g7fwvu96r3ucm42sf6dzpc36s",
            "Content-Type": "application/json"
        };
        var body = {
            to: "bsa26ztqb",
            data: [{
                "7": {
                    value: stars
                },
                "14": {
                    value: repid
                },
                "9": {
                    value: name
                },
                "18": {
                    value: lastname
                },
                "10": {
                    value: phone
                },
                "11": {
                    value: email
                },
                "8": {
                    value: comments
                },
                "20": {
                    value: checkbox
                    
                }
            }],
            fieldsToReturn: [7]
        };

        // if ($(checkbox).val(this.checked == 1)) {
        //     console.log('checked');
        // }
        // else if ($(checkbox).val(this.checked == 0)){
        //     console.log('unchecked');
        // };
        
        
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
                            text: "Review submitted successfully!",
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

    }
    
});

  }
  
  render()
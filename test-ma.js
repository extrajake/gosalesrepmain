var netlify = require('./functions/netlifyEnv'); 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
var data = localStorage.getItem("data");

const render = async () => {
    let apptoken = await netlify.getToken("jlacouvee", "APPTOKEN")
    let usertoken = await  netlify.getToken("jlacouvee", "USERTOKEN")
    var headers = {
        "QB-Realm-Hostname": "gosales.quickbase.com",
        Authorization: "QB-USER-TOKEN " + usertoken,
        "QB-APP-TOKEN":  apptoken,
        "Content-Type": "application/json",
      };
    var body = {
        from: "bsazkzsm2",
        select: [6, 7, 15, 16, 17, 21, 34, 42, 45, 48],
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
                var email = item[6].value ? item[6].value.email : "";
                var image = item[21].value ? item[21].value : "";
                var phone = item[17].value ? item[17].value : "";
                var bio = item[34].value ? item[34].value : "";
                var qrcode = item[15].value ? item[15].value : "";
                
                if (item[7].value) {
                    document.getElementById("slaes_rep").innerHTML = item[7].value;
                    if (item[45].value == "Active") {
                        document.getElementById("slaes_rep").style.background = "#35a0c7";
                    } else if (item[45].value == "Inactive") {
                        document.getElementById("slaes_rep").style.background = "red";
                    }
                } else {
                    document.getElementById("slaes_rep").style.display = "none";
                }
                
    
                document.getElementById("rep-img").innerHTML = image;
                document.getElementById("rep-name").innerHTML = name;
                document.getElementById("qrcode").innerHTML = qrcode;
                document.getElementById("phone").innerHTML = phone;
                if (bio) {
                    document.getElementById("biography").innerHTML = bio;
                }
    
                var herf = "../review/?id=" + id;
                var callback_url = "../callback/?id=" + id;
                document.getElementById("call_btn").href = "tel:+1" + phone;
                document.getElementById("mail_btn").href = "mailto:" + email;
    
                document.getElementById("review_btn").href = herf;
                document.getElementById("callback_url").href = callback_url;
            }
            
        }
    };
    xmlHttp.send(JSON.stringify(body));
    
    // var filter_data = JSON.parse(data).find(function(item) {
    //     return item.id == id
    // })
    // if (filter_data) {
    //     var name = filter_data.name;
    //     document.getElementById("rep-img").innerHTML = filter_data.image;
    //     document.getElementById("rep-name").innerHTML = filter_data.name;
    //     document.getElementById("qrcode").innerHTML = filter_data.qrcode;
    //     document.getElementById("phone").innerHTML = filter_data.phone;
    // }

}
render()

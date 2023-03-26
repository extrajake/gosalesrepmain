import {token} from './functions/netlifyEnv.js';
// require("dotenv").config();

// var secretKey = process.env.SECRET_KEY;
// console.log(secretKey);

const getToken = async (account_id, key) => {
    const url = `https://api.netlify.com/api/v1/accounts/${account_id}/env/${key}`;
    const response = await fetch(url, {
      method: "POST",
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
    select: [6, 15, 16, 17, 21],
    sortBy: [{ fieldId: 3, order: "ASC" }],
    options: { skip: 0, top: 0, compareWithAppLocalTime: false },
  };

  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", "https://api.quickbase.com/v1/records/query", true);

  for (const key in headers) {
    xmlHttp.setRequestHeader(key, headers[key]);
  }

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === XMLHttpRequest.DONE) {
      const response = JSON.parse(xmlHttp.response);
      var html = "";
      response.data.forEach((item) => {
        if (item[6].value) {
          var id = item[6].value
            ? item[6].value.id
            : new Date().getTime().toString();
          var name = item[6].value ? item[6].value.name : "";
          var email = item[6].value ? item[6].value.email : "";
          var image = item[21].value ? item[21].value : "";
          var phone = item[17].value ? item[17].value : "";
          var qrcode = item[15].value ? item[15].value : "";
          html += `<div class="row flex-row p-3">
                            <div class="job-box img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                                ${image}
                            </div>
                            <div class="job-content">
                            <h5 class="text-center text-md-left">${name}</h5>
                            <span class="taghome tag-teal my-2">${phone}</span>
                            <div class="job-right my-4 flex-shrink-0">
                            <a href="cards/?id=${id}" class="btn d-block w-100 d-sm-inline-block btn-light">Go to ${name}</a>
                            </div>
                            </div>
                        </div>
                        `;
        }
      });

      document.getElementById("filter-result").innerHTML = html;
    }
  };
  xmlHttp.send(JSON.stringify(body));
}
render();

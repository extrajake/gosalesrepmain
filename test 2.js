const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
var data = localStorage.getItem("data");
var headers = {
  "QB-Realm-Hostname": "gosales.quickbase.com",
  Authorization: "b4zk43xsngt3xd7ximtbdbxycvc",
  "Content-Type": "application/json"
};

var body = {
  from: "bsazkzsm2",
  select: [3, 6, 7, 15, 16, 17, 21, 33, 42, 45, 48],
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
        console.log(response.data);
        var item = response.data[0];
        var name = item[6].value ? item[6].value.name : "";
        var avg = item[48].value ? item[48].value : "";

        

        // console.log(typeof avg, name);
        document.getElementById("name").value = name;
        document.getElementById("avg").innerHTML = avg;
        }
      }
    };
  
xmlHttp.send(JSON.stringify(body));
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
  select: [6, 15, 16, 17, 21, 42],
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
      document.getElementById("rep-img").innerHTML = image;
      document.getElementById("name").value = name;
      document.getElementById("rep-name").innerHTML = name;
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
  var stars = $("input[name='stars']:checked").val();
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
      data: [
        {
          "7": {
            value: stars
          },
          "8": {
            value: comments
          },
          "9": {
            value: name
          },
          "10": {
            value: phone
          },
          "11": {
            value: email
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
              text: "You submit review successfully!",
              icon: "success"
            }).then(function(result) {
              location.reload(true);
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

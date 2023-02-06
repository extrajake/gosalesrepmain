const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
var data = localStorage.getItem("data");


var headers = {
  "QB-Realm-Hostname": "gosales.quickbase.com",
  Authorization: "b4zk43xsngt3xd7ximtbdbxycvc",
  "QB-App-Token": "b4zk43xsngt3xd7ximtbdbxycvc",
  "Content-Type": "application/json"
};
var body = {
  from: "bsazkzsm2",
  // from2: "bsa26ztqb",
  select: [3, 6, 7, 8, 15, 16, 17, 21, 33, 42, 45, 48, 49],
  where: "{42.EX.'" + id + "'}"
};

// var body2 = {
//   // from: "bsazkzsm2",
//   from2: "bsa26ztqb",
//   select: [17],
//   where: "{42.EX.'" + id + "'}"
// };

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
      var comment = item[8].value ? item[8].value : "";
      // var rev = item[17].value ? item[17].value : "";
      var validReview = item[17].value ? item[17].value : "";
      var image = item[21].value ? item[21].value : "";
      var repid = item[33].value ? item[33].value : "";
      var avg = item[48].value ? item[48].value.toFixed(2) : "";
      var avgCopy = item[49].value ? item[49].value : "";
      
      console.log(typeof avg, repid,);
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
      document.getElementById("name").value = name;
      document.getElementById("rating_name").innerText = name;
      document.getElementById("rep-name").innerHTML = name;
      document.getElementById("avg").innerHTML = avg;
      // document.getElementById("avg").innerHTML = avgCopy;
      document.getElementById("repid").value = repid;
      // document.getElementById("revTxt").value = rev;
    }
    // console.log(rev)
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

console.log(xmlHttp2);

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
}};

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
  console.log(e);
  var email = $("#email").val();
  var name = $("#name").val();
  var phone = $("#phone").val();
  var comments = $("#comments").val();
  var repid = $("#repid").val();
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
          "14": {
            value: repid
          },
          "9": {
            value: name
          },
          "10": {
            value: phone
          },
          "11": {
            value: email
          },
          "8": {
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
              text: "Review submitted successfully!",
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

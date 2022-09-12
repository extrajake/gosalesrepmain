var headers = {
    "QB-Realm-Hostname": "gosales.quickbase.com",
    // "User-Agent": "FileService_Integration_V2.1",
    Authorization: "b4zk43xsngt3xd7ximtbdbxycvc",
    "Content-Type": "application/json"
};

var body = {
    from: "bsazkzsm2",
    select: [6, 15, 17, 21],
    // where: "{33.CT.'6789'}",
    // where: "{33.CT.'12345'}",
    sortBy: [{ fieldId: 3, order: "ASC" }],
    // groupBy: [{ fieldId: 33, grouping: "equal-values" }],
    options: { skip: 0, top: 0, compareWithAppLocalTime: false }
};

const xmlHttp = new XMLHttpRequest();

xmlHttp.open("POST", "https://api.quickbase.com/v1/records/query", true);

for (const key in headers) {
    xmlHttp.setRequestHeader(key, headers[key]);
    // xmlHttp.setRequestHeader("Accept", "application/json");
}

xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState === XMLHttpRequest.DONE) {
        const response = JSON.parse(xmlHttp.response);
        var return_arr = [];
        var html = "";
        response.data.forEach(item => {
            var valueToPush = {};
            if ((item[6].value)) {
                var id = (item[6].value) ? item[6].value.id : (new Date()).getTime().toString();
                var name = (item[6].value) ? item[6].value.name : "";
                var email = (item[6].value) ? item[6].value.email : "";
                var image = (item[21].value) ? item[21].value : "";
                var phone = (item[17].value) ? item[17].value : "";
                var qrcode = (item[15].value) ? item[15].value : "";
                valueToPush["id"] = id;
                valueToPush["email"] = email;
                valueToPush["name"] = name;
                valueToPush["qrcode"] = qrcode;
                valueToPush["phone"] = phone;
                valueToPush["image"] = image;
                return_arr.push(valueToPush);
                html += `<div class="row flex-row p-3">
            <div
              class="job-box img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex"
              >
              ${image}
              </div>
              <div class="job-content">
              <h5 class="text-center text-md-left">${name}</h5>
              <span class="taghome tag-teal my-2">${phone}</span>
              <div class="job-right my-4 flex-shrink-0">
                          <a
                            href="cards?id=${id}"
                            class="btn d-block w-100 d-sm-inline-block btn-light"
                            >Go to ${name}</a
                          >
                        </div>
              </div>
          </div>
          </div>
          `;
            }

        })
        localStorage.setItem("data", JSON.stringify(return_arr));
        //   const listElement = (image, name, phone) => `

        //   <div class="row flex-row p-3">
        //   <div
        //     class="job-box img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex"
        //     >
        //     ${image}
        //     </div>
        //     <div class="job-content">
        //     <h5 class="text-center text-md-left">${name}</h5>
        //     <span class="taghome tag-teal my-2">${phone}</span>
        //     <div class="job-right my-4 flex-shrink-0">
        //                 <a
        //                   href="cards.html"
        //                   class="btn d-block w-100 d-sm-inline-block btn-light"
        //                   >Go to ${name}</a
        //                 >
        //               </div>
        //     </div>
        // </div>
        // </div>
        // `;

        //   const items = response.data
        //       .map(element => {
        //           const image = element["21"].value;
        //           const phone = element["17"].value;
        //           const name = element["6"].value && element["6"].value.name;
        //           const qrcode = element["15"].value;

        //           return listElement(image, name, phone);
        //       })
        //       .join("");

        document.getElementById("filter-result").innerHTML = html;
    }
};
xmlHttp.send(JSON.stringify(body));
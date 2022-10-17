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
    // console.log(xmlHttp.responseText);
    console.log(JSON.parse(xmlHttp.response));

    const response = JSON.parse(xmlHttp.response);
    const image = response.data[0]["21"].value;
    const phone = response.data[0]["17"].value;
    const name = response.data[0]["6"].value.name;
    const qrcode = response.data[0]["15"].value;

    // console.log(image);

    //

    // document.getElementById("rep-img").innerHTML = image;
    // document.getElementById("li").innerHTML = name;
    // document.getElementById("qrcode").innerHTML = qrcode;
    // document.getElementById("phone").innerHTML = phone;

    const listElement = (image, name, phone) => `
    <div
       class="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex"
       >
       ${image}
       </div>
       <div class="job-content">
       <h5 class="text-center text-md-left">${name}</h5>
       <span class="taghome tag-teal my-2">${phone}</span>
       </div>
   </div>
   `;

    // const https://helpful-paprenjak-53011d.netlify.app/cards-1.html website.com/card.html?id=123

    window.location.href.split("?");

    const items = response.data
      .map(element => {
        // const image = element["21"].value;
        const phone = element["17"].value;
        const name = element["6"].value && element["6"].value.name;
        const qrcode = element["15"].value;

        return listElement(image, name, phone);
      })
      .join("");

    document.getElementById("name-list").innerHTML = items;

    function getAgentIdFromUrl() {
      const currentUrl = window.location.href;
      //website.com?id=123&theme=dark
      //developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
      https: https: const array_broken_up_url = currentUrl.split("."); // [https://website.com, id=123]
      if (array_broken_up_url.length === 1) return "";
      //developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
      https: const searchParams = new URLSearchParams(array_broken_up_url[1]);
      return searchParams.get("id");
    }

    const id = getAgentIdFromUrl();

    if (!id) {
      // do something where ther is no id
    }

    //developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    https: const agentData = response.data.find(() => {});

    const name = agaent["6"].value.name;

    console.log(Object.values(response));
  }
};

// $(":radio").change(function() {
//   console.log("New star rating: " + this.value);
// });

xmlHttp.send(JSON.stringify(body));

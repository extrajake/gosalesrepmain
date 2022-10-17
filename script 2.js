var headers = {
    'QB-Realm-Hostname': 'gosales.quickbase.com',
  'User-Agent': 'FileService_Integration_V2.1',
  'Authorization': 'QB-USER-TOKEN b4zk43xsngt3xd7ximtbdbxycvc',
  'Content-Type': 'application/json'
}
var body = {"to":"bsa26ztqb","data":[\{"7":\{"value":5\},"8":\{"value":"This is a test Message"\},"9":\{"value":"John Doe"\},"10":\{"value":"5558887777"\},"11":\{"value":"Test@test.com"\},"14":\{"value":"67890"\}\}],"fieldsToReturn":[7]\}
const xmlHttp = new XMLHttpRequest();
xmlHttp.open('POST', 'https://api.quickbase.com/v1/records', true);
for (const key in headers) {
xmlHttp.setRequestHeader(key, headers[key]);
}
xmlHttp.onreadystatechange = function() {
if (xmlHttp.readyState === XMLHttpRequest.DONE) {
  console.log(xmlHttp.responseText);
}
};

xmlHttp.send(JSON.stringify(body));}

b4zk43xsngt3xd7ximtbdbxycvc

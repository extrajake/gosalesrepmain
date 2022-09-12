const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
var data = localStorage.getItem("data");
var filter_data = JSON.parse(data).find(function(item) {
    return item.id == id
})
if (filter_data) {
    var name = filter_data.name;
    document.getElementById("rep-img").innerHTML = filter_data.image;
    document.getElementById("rep-name").innerHTML = filter_data.name;
    document.getElementById("qrcode").innerHTML = filter_data.qrcode;
    document.getElementById("phone").innerHTML = filter_data.phone;
}
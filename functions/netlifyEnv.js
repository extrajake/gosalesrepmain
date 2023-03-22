exports.getToken = async (account_id, key) => {
    const url = `https://api.netlify.com/api/v1/accounts/${account_id}/env/${key}`
    const response = await fetch(url, {
      method: "GET",
      headers: {
         "User-Agent": "MyApp - narjune131@gmail.com",
         "Authorization": "Bearer " + "casj_4NnH8-YLRp2kAaMrt39Ihg93dj8-2tRVDjbxds"
      }
    })
    const json = await response.json()
    const value = json.values[0].value
    return value
  }
  
exports.createToken = async (account_id, key, scopes, id, value, context) => {
    const url = `https://api.netlify.com/api/v1/accounts/${account_id}/env`
    const response = await fetch(url, {
      method: "POST",
      body: 
        [{
          "key": "QB_APP_TOKEN",
          "scopes": [
            "builds"
          ],
          "values": [
            {
              "id": "qb-app-token-1",
              "value": apptoken,
              "context": "all"
            }
          ]
        }],
      headers: {
         "User-Agent": "MyApp (YOUR_NAME@EXAMPLE.COM)",
         "Authorization": "Bearer " + "casj_4NnH8-YLRp2kAaMrt39Ihg93dj8-2tRVDjbxds",
         "Content-Type": 'application/json'
      }
    })
    console.log(await response.text())
  }
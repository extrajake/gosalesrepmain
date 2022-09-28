{\rtf1\ansi\ansicpg1252\cocoartf2513
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww24240\viewh18200\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 Headers:\
\
QB-Realm-Hostname*Required\
  gosales.quickbase.com\
\
\
User-Agent\
  FileService_Integration_V2.1\
\
Authorization*Required\
  ************************************************\
\
\
-----------------------------------------------\
\
****Request Image of Agent\
\
Body \
\
\{\
  "from": "bsazkzsm2",\
  "select": [\
    21\
  ],\
  "where": "\{33.CT.'6789'\}",\
  "sortBy": [\
    \{\
      "fieldId": 3,\
      "order": "ASC"\
    \}\
  ],\
  "groupBy": [\
    \{\
      "fieldId": 33,\
      "grouping": "equal-values"\
    \}\
  ],\
  "options": \{\
    "skip": 0,\
    "top": 0,\
    "compareWithAppLocalTime": false\
  \}\
\}\
\
\
Response \
\
\{\
  "data": [\
    \{\
      "21": \{\
        "value": "<tr><img  Alt=\\"Manny Pinheiro67890\\" ' src='https://gosales.quickbase.com/up/bsazkzsm2/a/r1/e22'/></tr></table>"\
      \},\
      "33": \{\
        "value": "67890"\
      \}\
    \}\
  ],\
  "fields": [\
    \{\
      "id": 21,\
      "label": "Rep Card",\
      "type": "rich-text"\
    \},\
    \{\
      "id": 33,\
      "label": "Agent ID",\
      "type": "text"\
    \}\
  ],\
  "metadata": \{\
    "numFields": 2,\
    "numRecords": 1,\
    "skip": 0,\
    "totalRecords": 1\
  \}\
\}\
\
Javascript Code Sample:\
\
var headers = \{\
  	'QB-Realm-Hostname': 'gosales.quickbase.com',\
	'User-Agent': 'FileService_Integration_V2.1',\
	'Authorization': '************************************************',\
    'Content-Type': 'application/json'\
\}\
var body = \{"from":"bsazkzsm2","select":[21],"where":"\{33.CT.'6789'\}","sortBy":[\{"fieldId":3,"order":"ASC"\}],"groupBy":[\{"fieldId":33,"grouping":"equal-values"\}],"options":\{"skip":0,"top":0,"compareWithAppLocalTime":false\}\}\
\
const xmlHttp = new XMLHttpRequest();\
xmlHttp.open('POST', 'https://api.quickbase.com/v1/records/query', true);\
for (const key in headers) \{\
  xmlHttp.setRequestHeader(key, headers[key]);\
\}\
xmlHttp.onreadystatechange = function() \{\
  if (xmlHttp.readyState === XMLHttpRequest.DONE) \{\
    console.log(xmlHttp.responseText);\
  \}\
\};\
\
xmlHttp.send(JSON.stringify(body));\
--------------------------------------------------------\
\
****Create Call Me Record:\
\
Body \
\
\{\
  "to": "bsazk77pd",\
  "data": [\
    \{\
      "15": \{\
        "value": "67890"\
      \},\
      "7": \{\
        "value": "Customer Name"\
      \},\
      "8": \{\
        "value": "testemail@test.com"\
      \},\
      "9": \{\
        "value": "5558887777"\
      \}\
    \}\
  ],\
  "fieldsToReturn": [\
    7\
  ]\
\}\
\
\
Response\
\
\{\
  "data": [\
    \{\
      "3": \{\
        "value": 17\
      \},\
      "7": \{\
        "value": "Customer Name"\
      \}\
    \}\
  ],\
  "metadata": \{\
    "createdRecordIds": [\
      17\
    ],\
    "totalNumberOfRecordsProcessed": 1,\
    "unchangedRecordIds": [],\
    "updatedRecordIds": []\
  \}\
\}\
\
Javascript Code Sample:\
\
var headers = \{\
  	'QB-Realm-Hostname': 'gosales.quickbase.com',\
	'User-Agent': 'FileService_Integration_V2.1',\
	'Authorization': '************************************************',\
    'Content-Type': 'application/json'\
\}\
var body = \{"to":"bsazk77pd","data":[\{"7":\{"value":"Customer Name"\},"8":\{"value":"testemail@test.com"\},"9":\{"value":"5558887777"\},"15":\{"value":"67890"\}\}],"fieldsToReturn":[7]\}\
\
const xmlHttp = new XMLHttpRequest();\
xmlHttp.open('POST', 'https://api.quickbase.com/v1/records', true);\
for (const key in headers) \{\
  xmlHttp.setRequestHeader(key, headers[key]);\
\}\
xmlHttp.onreadystatechange = function() \{\
  if (xmlHttp.readyState === XMLHttpRequest.DONE) \{\
    console.log(xmlHttp.responseText);\
  \}\
\};\
\
xmlHttp.send(JSON.stringify(body));\
\
------------------------------------------------------------\
\
****Create Review Record \
\
Body \
\
\{\
  "to": "bsa26ztqb",\
  "data": [\
    \{\
      "14": \{\
        "value": "67890"\
      \},\
      "7": \{\
        "value": 5\
      \},\
      "8": \{\
        "value": "This is a test Message"\
      \},\
      "9": \{\
        "value": "John Doe"\
      \},\
      "10": \{\
        "value": "5558887777"\
      \},\
      "11": \{\
        "value": "Test@test.com"\
      \}\
    \}\
  ],\
  "fieldsToReturn": [\
    7\
  ]\
\}\
\
\
Response \
\
\{\
  "data": [\
    \{\
      "3": \{\
        "value": 4\
      \},\
      "7": \{\
        "value": 5\
      \}\
    \}\
  ],\
  "metadata": \{\
    "createdRecordIds": [\
      4\
    ],\
    "totalNumberOfRecordsProcessed": 1,\
    "unchangedRecordIds": [],\
    "updatedRecordIds": []\
  \}\
\}\
\
Javascript Code Sample:\
\
var headers = \{\
  	'QB-Realm-Hostname': 'gosales.quickbase.com',\
	'User-Agent': 'FileService_Integration_V2.1',\
	'Authorization': '************************************************',\
    'Content-Type': 'application/json'\
\}\
var body = \{"to":"bsa26ztqb","data":[\{"7":\{"value":5\},"8":\{"value":"This is a test Message"\},"9":\{"value":"John Doe"\},"10":\{"value":"5558887777"\},"11":\{"value":"Test@test.com"\},"14":\{"value":"67890"\}\}],"fieldsToReturn":[7]\}\
\
const xmlHttp = new XMLHttpRequest();\
xmlHttp.open('POST', 'https://api.quickbase.com/v1/records', true);\
for (const key in headers) \{\
  xmlHttp.setRequestHeader(key, headers[key]);\
\}\
xmlHttp.onreadystatechange = function() \{\
  if (xmlHttp.readyState === XMLHttpRequest.DONE) \{\
    console.log(xmlHttp.responseText);\
  \}\
\};\
\
xmlHttp.send(JSON.stringify(body));} 
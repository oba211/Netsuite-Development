import json
from requests_oauthlib import OAuth1Session
import requests 


CLIENT_KEY: str = "de198fe02685bca6ac79fa9bf40c01a6562d2832dcc21ddfd40c6fe051fbcbe2"
CLIENT_SECRET: str = "ad164c61faee08ea5a4051fb21ff99b6bb2085701973c5c0a2eae0334b086a97"
ACCESS_KEY: str = "4607a353da5996e8092b210167d4ad0d83b7809f71c494adbe70ee22b2b26d2c"
ACCESS_SECRET: str = "720f15dc9e15a3d67c53a95e7ad46deb3636169dd6156c2213cfc89cbaeb3286"
SIGNATURE_METHOD: str = "HMAC-SHA256"
REALM_ID: str = "TSTDRV2628567"
SCRIPT_ID: int = 1009
DEPLOY_ID: int = 1
URL: str = f"https://tstdrv2628567.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=1009&deploy=1"

oauth = OAuth1Session(
    client_key=CLIENT_KEY,
    client_secret=CLIENT_SECRET,
    resource_owner_key=ACCESS_KEY,
    resource_owner_secret=ACCESS_SECRET,
    realm=REALM_ID,
    signature_method=SIGNATURE_METHOD
)

data = {"Suite": "Script"}

headers = {
    "Content-Type": "application/json"
}

res = oauth.post(URL, data=json.dumps(data), headers=headers)
print(res)
conn = requests.get("https://rest.netsuite.com/app/site/hosting/restlet.nl?script=1009&deploy=1",headers=headers)
# print(conn.text)

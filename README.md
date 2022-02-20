Backend task for News Feed app 

ABOUT PROJECT: - On news feed app any user can read articles,blog of any journalist. User has been given option to filter out the category and authorName of article.Beside this functionality , user can find article based on the keyword used for search.

Prequisites:-
1) vs editor
2) install node and postman in your system

To run this project:
a)git clone this repository in your system 
b)open terminal and go to the directory where you have cloned the project and run >> npm init
c) run >> npm install
d) run >> node app.js
e) app is running successfull...yeah

To test the project:
1)Register - 
    a)Open postman and select method = 'POST'
    b)Paste this url http://localhost:3000/register
    c)In HEADER section make KEY = 'Content-Type' and VALUE = 'application/json'
    d) Paste this request in Body section, it is advisable not to make change in key but you can change the value part to test different test cases.
    {
    "userName":"test",
    "emailId":"test123@gmail.com",
    "password":"passtest",
    "phoneNo":"0998765342",
    "gender":"female",
    "language":"urdu",
    "maritalStatus":"married",
    "dateOfbirth":"29/09/1991",
    "timeOfbirth":"6pm"
    }

    Note - 'User will be only registered if all the above they keys are present'

1)To Upload feeds - 
    a)Open postman and select method = 'POST'
    b)Paste this url http://localhost:3000/upload
    c)In HEADER section make KEY = 'Content-Type' and VALUE = 'application/json'
    d) Paste this request in Body section,
    Note:-  it is advisable not to make change in key but you can change the value part to test different test cases.
    {
    "headline":"There will be rise in temp tomorrow",
    "category":"weather",
    "authorName":"test",
    "media":"https://upload.wikimedia.org/wikipedia/commons/e/ee/Chain_link_icon.png"
    }

    Note - 'User will be only registered if all the above they keys are present'


1)To fetch feeds - 
    a)Open postman and select method = 'GET'
    b)Paste this url http://localhost:3000/feeds
    c)In HEADER section make KEY = 'Content-Type' and VALUE = 'application/json'
    d) Paste this request in Body section,
    Note:-  it is advisable not to make change in key but you can change the value part to test different test cases
    {
    "authorName":[],
    "category":["weather"],
    "textSearch":"rise",
    }

    Note - value authorName and category field are passed in the form of array , while textSearch will remain as string only.



class Config{
    // for development get token
    static loginUrl="http://127.0.0.1:8000/api/gettoken/"
    static refreshApiUrl ="http://127.0.0.1:8000/api/refresh_token/"
    static clientApiUrl ="http://127.0.0.1:8000/api/client/"
    static appointmentUrl ="http://127.0.0.1:8000/api/appointment/"
    static assessmentUrl ="http://127.0.0.1:8000/api/counsellingAssess/"
    static homeUrl = "/home"
    static logoutPage = "/logout"

    // admin website
    static sidebarItem=[
        {"index":"0", "title":"Home", "url":"/home", "icons":"home"},
        {"index":"1", "title":"Client", "url":"/client", "icons":"face"},
    ]

    // counselling website
    static TopNavBarItem=[
        {"index":"0", "title":"About Us", "url":"/about", "image":""},
        {"index":"1", "title":"Services", "url":"#", "image":""},
        {"index":"2", "title":"", "url":"/", "image":"CSS logo"},
        {"index":"3", "title":"Team", "url":"#", "image":""},
        {"index":"4", "title":"Contact Us", "url":"#", "image":""},
        {"index":"5", "title":"FAQ", "url":"#", "image":""},
    ]
}

export default Config
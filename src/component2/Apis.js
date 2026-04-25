export default class Api {
    static main = {
        // value: "http://localhost:8082",
        value: "https://cheetah.codeguru-pro.com:8082/api",
    }
    static delete = {
        value: Api.main.value + "/deleted"
    }
    static lateAction = {
        value: Api.main.value + "/previous"
    }
    static import = {
        value: Api.main.value + "/import"
    }
    static  export = {
        value: Api.main.value + "/export"
    }

    static products = {
        value: Api.main.value + "/products"
    }
    
    static expenses = {
        value: Api.main.value + "/expenses"
    }
    
    static credit = {
        value: Api.main.value + "/credit"
    }

    

    static damages = {
        value:Api.main.value + "/damages"
    }
    static report = {
        value:Api.main.value + "/report"
    }
    static tools = {
        value:Api.main.value + "/tools"
    }

    static comvert = {
        value:Api.main.value + "/comvert"
    }
    
    static Token = {
        'Content-Type': "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    static passive = {
        value: Api.main.value + "/passive"
    }
}

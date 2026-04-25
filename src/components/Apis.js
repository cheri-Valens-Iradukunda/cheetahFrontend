export default class Api {
    static server = {
      // name: "http://localhost:8082",
      name: "https://cheetah.codeguru-pro.com:8082/api",
    };
    static product = {
      value: Api.server.name + "/product",
    };
    static productPrice = {
      value: Api.server.name + "/productPrice",
    }
    static productAction = {
        value: Api.server.name + "/productAction",
    }
    static Import = {
      value: Api.server.name + "/import",
      value2: Api.server.name + "/allImportsByDate"
    }
    static Export = {
      value: Api.server.name + "/export",
    }
    static generalReport = {
      value: Api.server.name + "/report/general",
    }

    static ExportsReport = {
      value: Api.server.name + "/exportsReport",
    }
    static ImportsReport = {
      value: Api.server.name + "/importsRepository",
    }
    static ByProductsReport = {
      value: Api.server.name + "/reportByProduct"
    }
    static Expenses = {
      value: Api.server.name + "/expenses"
    }
    static Report = {
      value: Api.server.name + "/report"
    }
    static StockAction = {
      value: Api.server.name + "/stockAction"
    }
    static Token = {
      'Content-Type': "application/json",
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    static Damages = {
      value: Api.server.name + "/damaged"
    }
    static Deleted = {
      value: Api.server.name + "/deleted"
    }
    // static 
}

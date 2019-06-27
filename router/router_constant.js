
function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

define('ROUTE_REGISTER', '註冊');
define('ROUTE_QUERYMONEY', '查詢餘額');
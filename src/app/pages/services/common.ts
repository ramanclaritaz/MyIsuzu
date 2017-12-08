export interface searchPagination{
        page:Int32Array,
        itemsPerPage:Int32Array,
        sortBy:string,
        reverse:boolean,
        totalItems:Int32Array
    
};
export interface _authentication {
        token: any,
        isAuth: false,
        userName: "",
        role: "",
        userid: "",
        userstate: "",
        companyid: "",
        userdepartcode: "",
        designationrole: "",
        displayname: "",
        employeenumbertype: "",
        locationid: "",
        isplantuser: false,
        isplantteamleader: false,
        isdualrole: false,
        istrainee:false
};

    
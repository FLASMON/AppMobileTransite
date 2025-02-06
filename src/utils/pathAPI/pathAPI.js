const pathAPI = {
    navire: {
        fetchALL: 'navire/fetchall'
    },
    login: {
        seconnect: 'users/loginclient',
        logout: 'users/logout'
    },
    dossier: {
        fetchAll: 'dossier/fetchall',
        get: 'dossier/get',
        getparbl: 'dossier/getparbl'
    },
    navirebl: {
        fetchAll: 'navirebl/fetchall'
    },
    dossier_detail: {
        confirm_receipt: 'suivieenlevementdetail/confirmreceiptmsg'
    },
    suivieenlevement: {
        fetchAll: 'suivieenlevement/fetchall',
        detail: 'suivieenlevementdetail/getbysuivieenlevement'
    },
    subclient: {
        fetchAll: 'subclient/fetchall',
        save: 'subclient/addaction',
        edit: 'subclient/editaction',
        get: 'subclient/get',
        delete: 'subclient/delete'
    }
}

export default pathAPI;
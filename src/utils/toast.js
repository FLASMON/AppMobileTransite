import {notification} from "ant-design-vue";

export default {
    showToast({msg, duration =3, type ='success'}){
        notification[type]({
            message: type ==='success' ? 'Succès' : 'Avertissement',
            description: msg,
            duration: duration,
            placement: 'topRight'
        })
    }
}
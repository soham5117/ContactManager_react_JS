import axios from "axios";

export class ContactServices{
    static serverURl=`http://localhost:8080`;
    static getAllContacts(){
        let dataUrl= `${this.serverURl}/contacts`
        return axios.get(dataUrl)
    }
   
    static async getContact(contactId){
        
        let dataUrl= `${this.serverURl}/contact/${contactId}`
        return await  axios.get(dataUrl)
    }

    static async createContact(contact){
        let dataURL=`${this.serverURl}/contact`;
        return await axios.post(dataURL,contact)
    }

    static updateContact(contact,contactId){
        console.log(contactId)
        let dataURL=`${this.serverURl}/contact?id=${contactId}`;
        console.log(`${this.serverURl}/contact?id=${contactId}`);
        return axios.put(dataURL,contact)
    }

    static deleteContact(contactId){
        let dataUrl= `${this.serverURl}/contact/${contactId}`;
        return axios.delete(dataUrl)
    }
}
import conf from '../conf/conf.js';


import { Client, Account, ID } from "appwrite";


export class AuthService{
  clinet =new Client();
  account;

  constructor(){
    this.clinet.setEndpoint(conf. appwriteUrl)
               .setProject(conf.appwriteProjectId);
               this.account=new Account(this.account);

  }
  async createAccount ({email,password,name}) {
    try{ 
       const userAccount= await this.account.create(ID.unique(),email,password,name)
        if(userAccount){
            // call another method if account exits then login if not sign up
           return this.login({email,password})
            // return userAccount
        }else{
            return userAccount; 
        }
    }catch(error){
          throw error;
    }
    
  }
  async  login({email,password}) {
    try {
        return  await this.account.createEmailSession(email,password);
    } catch (error) {
        throw error;
    }
  }
  async getCurrentuser(){
    try {
     await   this.account.get();
    } catch (error) {
       console.log("Appwrite Services:: getCurrentuser:: error",error);
       
    }
    return null;

  }
  async logout(){
 try {
    await this.account.deleteSessions();
    
 } catch (error) {
    console.log("Apperite Services::logout::error::",error);
    
 }
  }

}

const authService=new AuthService();
export default authService;
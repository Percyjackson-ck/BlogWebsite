import conf from  '../conf.js'
import { Client, Account, ID,Databases,Storage,Query } from "appwrite";



export class Service{
   clinet =new Client();
   databases;
   bucket;
   constructor(){
     this.clinet.setEndpoint(conf. appwriteUrl)
                   .setProject(conf.appwriteProjectId);
                   this.databases=new Databases(this.clinet);
                   this.bucket=new Storage(this.clinet)

   }
   async createPost({title,slug,content,featuredimage,status,userId}){
    try {
        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredimage,
                status,
                userId,
            }
        )
    } catch (error) {
        console.log("App write service:: create post:: error",error);
        
    }
   }
   async updatepost(slug,{title,content,featuredimage,status}) {
   try {
     return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,{
          

            title,
            content,featuredimage,
            status,
        }
     )
   } catch (error) {
    console.log("App write service:: update post:: error",error);
    
   } 
   }
     
   async deletepost(slug) {
    try {
       await this.databases.deleteDocument(
         conf.appwriteDatabaseId,
         conf.appwriteCollectionId,
         slug

      )
      return true
    } catch (error) {
     console.log("App write service:: delete post:: error",error);
     return false
    } 
    }

    async getPost(slug){
        try {
            return this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            
        } catch (error) {
            console.log("App write service:: get post:: error",error);
            
        }
    }
    async getPosts(queries=[Query.equal("status","active")]){
        try {
            return this.databases.listDocuments(
     conf.appwriteDatabaseId,
     conf.appwriteCollectionId,
     queries,
     

            )
        } catch (error) {
            console.log("app write service:: get posts:: error",error);
            return false
        }
    }
   // 

   //File upload services
   async uploadFile(file){
    try {
        return await this.bucket.createFile(
            conf. appwriteBucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log("App write service:: upload file:: error",error);
        return false
    }

   }
   async deletFile(fileId){
    try {
        await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId

        )
        return true
    } catch (error) {
        console.log("App write service:: delete file:: error",error);
        return false
    }
   }

   getFilePreview(fileId){
    return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
    )
   }

};

const service=new Service();
export default service;
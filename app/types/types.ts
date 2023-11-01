export interface CurrenCourse{
    id:string;
    name:string;
    image:null | string;
    coverVideo:null | string;
    price:number | null;
    categoryId:null| string;
    isFree:boolean;
    isPublished:boolean
    userId:string;

    user:{
        id:string;
        name:string;
        isInstructor:boolean
    }
    updatedAt:Date;
    createdAt:Date;






}
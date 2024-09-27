import { NextFunction, Request, Response } from "express";
import { jwtVerification } from "../../utility/jwtVerification";
import { checkIfUserIsAdmin } from '../../services/users/user.service'
import { findCategoryByName,createCategoryDb } from "../../services/products/category.service";
  
export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
       try {
         const { name } = req.body;
         const user = await jwtVerification(req, next);
         if (!user) {
                 return res.status(400).json({
                         "error": "Bad Request",
                         "message": "Required Token is missing"
                 })
         }
         console.log("user=>", user.id)
         const admin = await checkIfUserIsAdmin(user.id)
         if (!admin) {
                 return res.status(400).json({ "message": "Only Admin can do this" })
         }
         if (typeof (name) !== 'string') {
                 res.status(400).json({ message: "please insert valid category" })
         }
         // check if category already exist
         const category =await findCategoryByName(name);
         console.log("category is ",category);
         if(category != null){
              return  res.status(400).json({message: "Category already exist"});
         }
         const categorySave = await createCategoryDb({name});
         if(!categorySave){
              return   res.send(500).json({message: "something wrong"})
         }
         res.status(200).send(categorySave);
       } catch (error) {
        next(error)
       }
}
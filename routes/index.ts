import Express from "express";
import rolesRoute from "./role.route";
import restoRoute from "./restaurant.route";
import userRoute from "./user.route";
import authRoute from "./Auth.route";
const router = Express.Router();
router.use("/users", userRoute

    /*
    #swagger.tags = ['User']
    #swagger.security = [{
        "bearerAuth": []
        }] 
        */
)
router.use("/roles", rolesRoute

    /*
    #swagger.tags = ['Roles']
    #swagger.security = [{
        "bearerAuth": []
        }] 
        */
)
router.use("/restaurant", restoRoute

    /*
    #swagger.tags = ['Restaurants']
   
        */
)
router.use("/auth", authRoute

    /*
    #swagger.tags = ['Auth']
   
        */
)
export default router;


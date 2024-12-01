import React from "react";
import FloatingShape from "./FloatingShape";

const FloatingShapes = ()=>{
    return(
        <>
        <FloatingShape color="bg-yellow-400" size="w-64 h-64" top="-5%" left="10%" delay={0} />
         <FloatingShape color="bg-yellow-400" size="w-48 h-48" top="70%" left="80%" delay={0} />
          <FloatingShape color="bg-yellow-400" size="w-32 h-32" top="40%" left="10%" delay={0} />
          </>
    )

}
export default FloatingShapes
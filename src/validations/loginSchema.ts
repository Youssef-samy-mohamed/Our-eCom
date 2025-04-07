import { z } from "zod";




const loginSchem = z.object({
  email: z.string().min(1, { message: "Email address is required" }).email(),
  password: z.string().min(1, { message: "Password is required" }),
});


type loginType = z.infer<typeof loginSchem>;


export  {loginSchem , type loginType};
const zod=require('zod')
const userSchema=zod.object({
    username:zod.string().email(),
    password:zod.password(),
    firstName:zod.string(),
    lastName:zod.string()
})
const updateUser=zod.object({
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})


module.exports={ userSchema,updateUser }
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

//inseting users in users Table
async function insertUser(username: string, password: string, firstName: string, lastName: string) {
    const res = await prisma.user.create({
        data: {
            email: username,
            password,
            firstName,
            lastName
        }
    })
  console.log(res)
}

interface UpdateParams {
    firstName: string;
    lastName: string;
}

async function updateUser(username: string, {
    firstName,
    lastName
}: UpdateParams) {
    const res = await prisma.user.update({
        where:{ email:username },
        data:{
            firstName,
            lastName
        }
    })
    console.log(res)
}

interface TodoParams{
    title:string,
    description:string,

}

async function insertTodo(userId:number, {title, description}:TodoParams) {

    try{
    const result = await prisma.todos.create({
        data:{
            userId,
            title,
            description,
        }
    })
    console.log(result) 
    return result
}catch(err){
    console.log(err + " " + "Unable to add Todo")
}
}

async function getTodos(userId:string) {
    const user_Id = parseInt(userId)
    try{
    const result = await prisma.todos.findMany({
        where:{
            userId:user_Id,
        }
    })
    console.log(result)
    return result
}catch(err){
    console.log(err + " " + "Unable to add Todo")
}
}

async function getTodosAndUserDetails(userId: number) {
    try{
    const results = await prisma.user.findUnique({
        where:{
            id:userId
        },
        select:{
          firstName:true,
          lastName:true,
          todos:true
        }
    })
    console.log(results)
    return results
}catch(err){
    console.log(err + " " + "Not able to get Todos")
}
}

export{ insertUser, insertTodo}






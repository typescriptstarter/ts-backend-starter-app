
import prisma from '../../prisma'

export async function index(req, h) {

    try {

        const instructors = await prisma.instructor.findMany()

        return h.response({ instructors }).code(200)

    } catch(error) {

        console.log(error)
        return h.response(error).code(500)

    }
  
  }
  
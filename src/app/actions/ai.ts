'use server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { env } from '@utils/env'

interface GenerateResponse {
  prompt: string
}

const AI = new GoogleGenerativeAI(env.AI_KEY)

const model = AI.getGenerativeModel({ model: 'gemini-pro' })

export const generateResponse = async ({
  prompt
}: GenerateResponse): Promise<string> => {
  const response = await model
    .generateContent(prompt)
    .then(async ({ response }) => response)
  return response.text()
}

export const generateReport = async ({
  prompt
}: GenerateResponse): Promise<string> => {
  const currentDate = new Date()
  const response = await generateResponse({
    prompt: `Genera un reporte de avances de las actividades que se crearon hoy o se modificaron hoy la fecha del dia de hoy es ${currentDate.toLocaleDateString()} puedes hacer la conparacion con estas tareas como maximo son 10 por ahora.
    
    pero todo esto debe de ser en un lenguaje lo mas natural posible aunque la tarea no tenga muchas especificaciones puedes  mejorar un poco la comprencion de cada tarea, ten en cuenta que la estimacion de las tareas es calculada en horas es decir que si tiene por ejemplo 0.5 eso quiere decir que se estiman 30min de la tarea y que las respuestas sean en parrafos no lista que se ve como que fue hecho de una tabla. 

  por favor no poner data que no esta especificada en la tarea tales como: respuestas de cliente, datos de la empresa, datos de la cuenta, datos de la plataforma, datos de la api, datos de la base de datos, datos de la arquitectura, datos de la infraestructura, datos de la tecnologia, datos de la documentacion, para que no haya problemas con la informacion que se comparte con el cliente, puedes empezar a escribir el reporte de avances de las tareas que se crearon hoy o se modificaron hoy, recuerda que la fecha del dia de hoy.

    puedes empezar el reporte con las siguientes fraces: 
    

  El dia de hoy trabaje con {titulo de la tarea} la cual esta en un proceso de {estaus de la tarea} mas detalles descripcion y eso si es necesario traduce las palabras al espanol siempre y cuando no sea un lenguaje tecnico como: nombre de tablas, procedimientes, funcciones, nombre de cclientes, etc. El nombre y descripcion de la tarea su puedes traducirlo.
  
  
  \n\n${prompt}`
  })
  return response
    .replace(/(?:__|[*#])+/g, '')
    .replace(/#+\s/g, '')
    .replace(/(\*{1,2}|_{1,2})(.*?)\1/g, '$2')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)')
    .replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .trim()
}

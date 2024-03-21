import express, { json, text } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { config } from 'dotenv'
import OpenAI from 'openai'
import { iSearch } from './interfaces/iSearch'
import { version } from "../package.json"

//dot env
config()

const app = express()

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.use(json())
app.use(text())
app.use(cors())

app.post(process.env.PATH_API || '/search', async (req: express.Request, res: express.Response) => {

    const body: iSearch = await req.body

    try {

        if (!body.search) {
            throw new Error(`Error, the body of the message or the "search" parameter is missing. {"search":"Product x Search"}.`)
        }

        if (!body.country) {
            throw new Error(`Error: The "country" field is missing from the message body.`);
        }

        if (!body.typeOfProducts) {
            throw new Error(`Error: The "typeOfProducts" field is missing from the message body.`);
        }


        if (body.search.length > 50) {
            throw new Error('Error, the "search:" parameter cannot exceed 50 characters as a maximum.')
        }

        if (body.country.length > 56) {
            throw new Error('Error, the "country" parameter cannot exceed 56 characters as a maximum.')
        }

        if (body.typeOfProducts.length > 57) {
            throw new Error('Error, the "typeOfProducts" parameter cannot exceed 57 characters as a maximum.')
        }

        const openai = new OpenAI({
            apiKey: process.env.OPEN_AI_API, // defaults to process.env["OPENAI_API_KEY"]
        });

        const resultAi = await openai.chat.completions.create(
            {
                model: process.env.MODEL_AI || "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: `Corrigeelvalorolapalabrade'search'ydevuélvemeelvalorarrayJSONcorregidoyposiblesbúsquedasej[{\"search\":\"Productox\"}]SolodameelJSONnomeenvíesinformaciónninúntextodetuparteElusuarioestáintentandobuscarunproductoAhoratemandaréuntextoenproducciónrecuerdaesunproductoTratadeanalizarquéproductodelmercadoestábuscandoelusuario>siesunproductoXentoncestratadeentregarunproductoquecreesqueelusuarioestábuscandoMayoritariamenteelusuarionosintentarábuscarproductosde${body.typeOfProducts}ocualquiercosasimilardelpaís${body.country}opaísesvecinosTratadedarmeposiblesbúsquedasihadiferentes${body.typeOfProducts}conelmismonombreporlomenosde2a4resultadosElprimeroeselquetienemáscoincidenciasyluegolosdemásenorden`
                    },
                    {
                        role: "user",
                        content: "{\"search\": \"Full loco\"}"
                    },
                    {
                        role: "assistant",
                        content: "[{\"search\": \"Four Loko\"},{\"search\": \"Bebida Four Loko\"},{\"search\": \"Four Loko Blue\"}]"
                    },
                    {
                        role: "user",
                        content: "{\"search\": \"agua espumofa\"}"
                    },
                    {
                        role: "assistant",
                        content: "[{\"search\": \"Agua Espumosa\"}]"
                    },
                    {
                        role: "user",
                        content: `{"search":"${body.search}"}`
                    }
                ],
                max_tokens: 100
            }
        )

        const resultIa = resultAi.choices[0].message.content

        console.log('Result iA: ', resultAi)

        if (resultIa) {
            res.status(200).json(JSON.parse(resultIa))
        } else {
            throw new Error('Error iA Result')
        }


    } catch (error: any) {
        res.status(400).json({
            message: error.message,
            code: 400,
            error: true
        })
    }

})


const HOST = '0.0.0.0'
const PORT = process.env.PORT_SERVER || '3388'


app.listen(parseInt(PORT), HOST, () => {
    console.log('Port Server: ' + PORT);
    console.log('App Version ', version)
});

# Aplicación de búsqueda asistida con IA

Esta aplicación utiliza [OpenAI](https://openai.com) para ayudar a los usuarios a buscar productos.

## Configuración inicial

### Variables de entorno

Deberá configurar algunas variables de entorno para ejecutar esta aplicación. Puede hacerlo creando un archivo `.env` en la raíz de su proyecto con el siguiente formato:

```
OPEN_AI_API=YOUR_OPEN_AI_API_KEY
MODEL_AI=YOUR_MODEL
PORT_SERVER=YOUR_SERVER_PORT
PATH_API=YOUR_API_PATH
```

A continuación se detalla cada variable:

- `OPEN_AI_API`: Clave de la API de OpenAI.
- `MODEL_AI`: El modelo de OpenAI a usar, p.ej. `"gpt-4"`.
- `PORT_SERVER`: El puerto en el que se ejecutará su servidor.
- `PATH_API`: La ruta de su API.

### Correr la aplicación con Docker compose

Para construir y correr el contenedor Docker de la aplicación con Docker compose, puede usar el archivo `docker-compose.yml` proporcionado. Para hacerlo, abra una terminal en el directorio de su proyecto y ejecute el siguiente comando:

```bash
docker-compose up
```

Asegúrese de tener Docker y Docker Compose instalados en su sistema.

## Uso de la aplicación

Después de iniciar su servidor, puede comenzar a realizar solicitudes POST a la ruta de la API que especificó en sus variables de entorno (`PATH_API`). Cada solicitud debe contener un cuerpo JSON con los siguientes campos:

- `search`: el término de búsqueda del producto
- `country`: el país relevante para la búsqueda
- `typeOfProducts`: el tipo de producto que se busca

Aquí tienes un ejemplo de cómo se vería tal solicitud:

```bash
curl --location --request POST 'http://localhost:${PORT_SERVER}/${PATH_API}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "search": "Full loco",
    "country": "US",
    "typeOfProducts": "Drink"
}'
```

## Actualizaciones

Para obtener actualizaciones de la aplicación, recuerde que puede hacer `pull` del contenedor Docker con el comando `docker-compose pull`.

## Contribución

Las contribuciones y sugerencias son siempre bienvenidas.

Un versión pre-build de la aplicación está registrada en el package.json como `"version": "0.0.1"` puede verse utilizando la URL 'http://localhost:${PORT_SERVER}/${PATH_API}' .

¡Disfrute del servicio inteligente de búsqueda de productos!
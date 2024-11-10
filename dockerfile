# Usar una imagen oficial de Node.js
FROM node:22.9.0-alpine3.19

# Configura el directorio de trabajo
WORKDIR /home/node/nest

# Copia el archivo de dependencias
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto del código al contenedor
COPY . .

# Expone el puerto de la aplicación
EXPOSE 3030

# Comando de inicio para la aplicación
CMD ["npm", "run", "start:dev"]

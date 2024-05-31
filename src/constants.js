const EnvVariables = {
  PORT  :process.env.PORT ,
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  DB_NAME:"gcom",
  CLOUD_NAME:process.env.CLOUD_NAME,
  API_KEY:process.env.API_KEY,
  API_SECRET:process.env.API_SECRET,
  COMPANY_EMAIL:process.env.COMPANY_EMAIL,
  EMAIL_PASS:process.env.EMAIL_PASS,
  EMAIL_SERVICE:process.EMAIL_SERVICE,
  SMTP_PORT: process.env.SMTP_PORT, 
  SMTP_HOST:process.env.SMTP_HOST, 
  JWT_SECRET_KEY:process.env.JWT_SECRET_KEY ,
  JWT_EXPIRE_TIME:process.env.JWT_EXPIRE_TIME,
}

export default EnvVariables
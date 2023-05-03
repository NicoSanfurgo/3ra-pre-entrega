import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT || 8080,
    MONGO_ATLAS_SRV: process.env.MONGO_ATLAS_SRV ,
    TWILIO_ACCOUNT_ID:process.env.TWILIO_ACCOUNT_ID,
    TWILIO_TOKEN:process.env.TWILIO_TOKEN,
    TWILIO_CELLPHONE:process.env.TWILIO_CELLPHONE,
}


import Config from '../config';
import twilio from 'twilio';

class Twilio {
  twilio;

  constructor() {
    this.twilio = twilio(Config.TWILIO_ACCOUNT_ID, Config.TWILIO_TOKEN);
  }

  async sendWhatsAppMessage(
    cellphoneNumber,
    message
  ) {
    const MessageListInstanceCreateOptions = {
      body: message,
      from: `whatsapp:${Config.TWILIO_CELLPHONE}`,
      to: `whatsapp:${cellphoneNumber}`,
    };

    const response = await this.twilio.messages.create(MessageListInstanceCreateOptions);
    return response;
  }
}

export const WppService = new Twilio();
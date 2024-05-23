import twilio from 'twilio';
import config from "config"


let {TWILIO_SID,TWILIO_TOKEN,TWILIO_NUMBER}=config.get("SMS")
const accountSid = TWILIO_SID;
const authToken = TWILIO_TOKEN;
const client = twilio(accountSid, authToken);

async function sendSMS(MsgData){
    try {
        await client.messages
        .create({
           body: MsgData.body,
           from:TWILIO_NUMBER,
           to: MsgData.to
         })
         console.log("sms sent");
    } catch (error) {
        console.log(error);
    }
}
export default sendSMS
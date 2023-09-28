import mongoose from "mongoose";
import messageModel from "../models/messages.model.js";


class messageManagerDB {

    async getMessages() {
        try {
            return await messageModel.find({})
        } catch (e) {
            return "[400] " + e.message
        }
    }

    async addMessage(messageInfo) {
        try {
            const result = await messageModel.create(messageInfo)
            return this.getMessages()
        } catch (e) {
            return "[400] " + e.message
        }
    }


}


export default messageManagerDB
import axios from "axios";
import { key, bid } from "./config.json";

/**
 * @description This function is used to get the AI response from the API.
 * @param {string} message The message to be sent to the API.
 * @returns {Promise<string>} The response from the API.
 */
export default class ChatAI {
    constructor() { }

    /**
     * @param message The message to be sent to the API.
     * @returns {Promise<string>} The response from the API.
     */
    async getResponse(message: string) {
        const uid = 746376;
        const res = await axios.get(`http://api.brainshop.ai/get?bid=${bid}&key=${key}&uid=${uid}&msg=${message}`);
        return res.data.cnt
    }
}
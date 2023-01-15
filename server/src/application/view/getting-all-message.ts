import { gettingMessage } from "../../infra/db/controller";
import { Message } from "../entities/message";

export class GettingAllMessages {
  async execute(roomName:string):Promise<Message[] | null> {
    const response = await gettingMessage(roomName)
    return response
  }
}
import { insertMessage } from "../../infra/db/controller";
import { Message } from "../entities/message";

export class SendMessage {
  async execute(message:Message,roomName:string) {
    await insertMessage(message,roomName)
  }
}
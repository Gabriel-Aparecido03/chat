import { gettingLastMessages } from "../../infra/db/controller";

export class GetLastMessage {
  async execute(roomName:string) {
    const response = await gettingLastMessages(roomName)
    return response
  }
}
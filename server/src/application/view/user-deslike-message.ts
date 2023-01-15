import { deslikeMessage } from "../../infra/db/controller"

interface messageLikeAndDeslike {
  userActionId : string
  messageId : string
}

export class UserDeslikeMessage {
  async execute({userActionId,messageId}:messageLikeAndDeslike,roomName:string) {
    const response = await deslikeMessage(roomName,messageId,userActionId)
    return response
  }
}
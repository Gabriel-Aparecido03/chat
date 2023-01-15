import { likeMessage } from "../../infra/db/controller"

interface messageLikeAndDeslike {
  userActionId : string
  messageId : string
}

export class UserLikeMessage {
  async execute({userActionId,messageId}:messageLikeAndDeslike,roomName:string) {
    const response = await likeMessage(roomName,messageId,userActionId)
    return response
  }
}
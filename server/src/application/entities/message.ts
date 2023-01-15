import { randomUUID } from "crypto";

interface LikeType {
  count : number
  likeUsers : String[]
}

interface MessageProps {
  content :  string
  date? : Date
  userId : string
  userName : string
  like? : LikeType
}

export class Message {

  private _id:String
  private content: String
  private date : Date
  private userName : String
  private userId : string
  private like? : LikeType

  constructor(props : MessageProps) {
    const likeNull = { count: 0,likeUsers : []}
    this._id = randomUUID()
    this.content = props.content
    this.date = props.date ? props.date : new Date()
    this.userId = props.userId
    this.userName = props.userName
    this.like = props.like ? props.like  : likeNull
  }

 /*  public likingMessage(userId : String) {
    this.props.like.count =+ 1
    this.props.like.likeUsers.push(userId)
  }

  public deslikeMesage(userId : String) {
    this.props.like.count =-1
    const filteredLikeList = this.props.like.likeUsers.filter(user => user !== userId)
    this.props.like.likeUsers = filteredLikeList
  } */
}
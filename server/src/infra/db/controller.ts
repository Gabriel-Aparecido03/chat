import { MongoClient } from "mongodb";
import { Message } from "../../application/entities/message";
import  dotenv  from 'dotenv'
type objRoom = any
dotenv.config()
const uri = process.env.SERVER_PATH

const client = new MongoClient(uri)
const db = client.db()
const collection  = db.collection('rooms');

export async function runningDatabase() {
    try {
        const reactRoom:objRoom = {
            name:'React',
            dateCreation:new Date().toString(),
            messages:[]
        }

        const javacriptRoom:objRoom = {
            name:'Javascript',
            dateCreation:new Date().toString(),
            messages:[]
        }

        const cssRoom:objRoom = {
            name:'Css',
            dateCreation:new Date().toString(),
            messages:[]
        }

        const HtmlRoom:objRoom = {
            name:'HTML',
            dateCreation:new Date().toString(),
            messages:[]
        }
        
        if(!await collection.findOne({name:"React"})) {
            collection.insertOne(reactRoom)
            collection.insertOne(javacriptRoom)
            collection.insertOne(cssRoom)
            collection.insertOne(HtmlRoom)
        }

    } catch (error) {
        console.log(error)
    }
}

export async function insertMessage(messageObject : Message,roomName :string) {
    try {
        const message = messageObject
        const room = await collection.findOne({name:roomName})
        
        const roomMessageUpdated = [...room.messages,message]
        await collection.updateOne({name:roomName},{$set:{messages: roomMessageUpdated}})
    } catch (error) {
        throw new Error(error)
    }
}

export async function gettingMessage(roomName:string) {
    try {
        const room = await collection.findOne({name:roomName})
        return room.messages
    } catch (error) {
        throw new Error(error)
    }
}

export async function likeMessage(roomName:string,messageId:string,userId:string) {
    try {
        const room = await collection.findOne({name:roomName})
        const messageSubs = room.messages
        const roomMessageFiltered = room.messages.filter(message => message._id === messageId)
        const indexSubs = room.messages.findIndex(message => message._id === messageId )
        roomMessageFiltered[0].like.count += 1
        roomMessageFiltered[0].like.likeUsers.push(userId)

        messageSubs[indexSubs] = roomMessageFiltered[0]
        await collection.updateOne({name:roomName},{$set:{messages: messageSubs}})
        return roomMessageFiltered[0]
    } catch (error) {
        console.log(error)
    }
}

export async function deslikeMessage(roomName:string,messageId:string,userId:string) {
    try {
        const room = await collection.findOne({name:roomName})
        const messageSubs = room.messages
        const roomMessageFiltered = room.messages.filter(message => message._id === messageId)
        const indexSubs = room.messages.findIndex(message => message._id === messageId )
        roomMessageFiltered[0].like.count = roomMessageFiltered[0].like.count - 1
        roomMessageFiltered[0].like.likeUsers.pop()

        messageSubs[indexSubs] = roomMessageFiltered[0]
        await collection.updateOne({name:roomName},{$set:{messages: messageSubs}})
        return roomMessageFiltered[0]
    } catch (error) {
        console.log(error)
    }
}

export async function gettingLastMessages(roomName:string) {
    try {
        const room = await collection.findOne({name:roomName})
        return room.messages[room.messages.length - 1] 
    } catch (error) {
        console.log(error)
    }
}
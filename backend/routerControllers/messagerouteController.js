import Conversation from "../schema/conversationModels.js";
import Message from "../schema/messageSchema.js";

export const sendMessage = async(req,res)=>{
    try {
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._conditions._id;

        let chats = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        })
        if(!chats){
            chats=await Conversation.create|({
                participants:[senderId,receiverId]
            })
        }

        const newMessages = new Message({
            senderId,
            receiverId,
            message,
            conversationId:chats._id

        })

        if(newMessages){
            chats,message.push(newMessages._id)
        }

        //Socket.io
        await Promise.all([chats.save(),newMessages.save()])

        res.status(201).send(newMessages)
    } catch (error) {
        
    }
} 
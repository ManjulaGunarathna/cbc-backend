import Order from "../models/order.js";
import { isCustomer } from "./userController.js";

export async function createOrder(req,res){
    //cbc0001

    if(!isCustomer){
        res.json({
            messege: "Please login as customer to create orders"
        })
    }
    //take the latest product id
    try{
        const latestOrder = await Order.find().sort
        ({date : -1}).limit(1)

        let orderId;

        if(latestOrder.length == 0){
            orderId ="CBC0001"
        }else{
            const currentOrderID = latestOrder[0].
            orderId

            const numberString = currentOrderID.replace("CBC","")

            const number = parseInt(numberString)

            const newNumber = (number + 1).toString
            ().padStart(4, "0");

            orderId = "CBC" +newNumber
        }

        const newOrderData = req.body
        newOrderData.orderId = orderId
        newOrderData.email = req.user.email

        const order = new Order(newOrderData)

        await order.save()

        res.json({
            messege: "Order created"
        })

    }catch(error){
        res.status(500).json({
            messege : error.messege
        })
    }
}

export async function getOrders(req,res){
    try{
        const orders = await Order.find({email : req.user.email})

        res.json(orders)
    }catch(error){
        res.status(500).json({
            messege: error.messege
        })
    }
}
import amqplib from "amqplib";

const RABBITMQ_URL = "amqp://admin:admin@localhost:5672";

export const connectRabbitMQ = async (email:string,code:string) => {
    try {
        const connection = await amqplib.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        console.log("Auth Server connected to RabbitMQ");

        await channel.assertQueue("mail_queue", { durable: true });

        // Gửi tin nhắn
        channel.sendToQueue("mail_queue", Buffer.from(JSON.stringify({email,code})));
        console.log("Message sent to mail_queue");

        return { connection, channel };
    } catch (error) {
        console.error("RabbitMQ Connection Error:", error);
    }
};
export const listenRabbitMQ = async () => {
    try {
        const connection = await amqplib.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        console.log("Mail Service connected to RabbitMQ");

        await channel.assertQueue("mail_queue", { durable: true });

        // Nhận tin nhắn
        channel.consume("mail_queue", (msg) => {
            if (msg) {
                const receivedData = JSON.parse(msg.content.toString());

                console.log("Received:", receivedData);
                channel.ack(msg); // Xác nhận tin nhắn đã xử lý
            }
        });

    } catch (error) {
        console.error("RabbitMQ Connection Error:", error);
    }
}
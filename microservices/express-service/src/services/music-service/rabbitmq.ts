import amqplib from "amqplib";

const RABBITMQ_URL = "amqp://admin:admin@localhost:5672";

export const connectRabbitMQ = async () => {
    try {
        const connection = await amqplib.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        console.log("User Server connected to RabbitMQ");

        await channel.assertQueue("music_queue", { durable: true });

        // Gửi tin nhắn
        channel.sendToQueue("music_queue", Buffer.from("Hello from User Server"));
        console.log("Message sent to music_queue");

        return { connection, channel };
    } catch (error) {
        console.error("RabbitMQ Connection Error:", error);
    }
};

export const listenRabbitMQ = async () => {
    try {
        const connection = await amqplib.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        console.log("Music Service connected to RabbitMQ");

        await channel.assertQueue("music_queue", { durable: true });

        // Nhận tin nhắn
        channel.consume("music_queue", (msg) => {
            if (msg) {
                console.log("Received:", msg.content.toString());
                channel.ack(msg); // Xác nhận tin nhắn đã xử lý
            }
        });

    } catch (error) {
        console.error("RabbitMQ Connection Error:", error);
    }
}
import * as StompJs from '@stomp/stompjs';

const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/ws'

});

stompClient.onConnect = (frame) => {
    
    console.log("STOMP Connected: " + frame)

    stompClient.subscribe('/topic/tasks', (message) => {
        const updatedTask = JSON.parse(message.body);
        // stompClient(JSON.parse(message).content) //Might not need to parse JSON
        console.log('Received update:', updatedTask)

        handleTaskUpdate(updatedTask)

    })
    

}
export const sendTaskUpdate = (task, retryCount = 5) => {
    if (!stompClient.active) {
        if (retryCount <= 0) {
            console.error("STOMP client is still not connected after retries.");
            return;
        }

        console.log(`STOMP client not ready. Retrying in 500ms... (${retryCount} retries left)`);
        setTimeout(() => sendTaskUpdate(task, retryCount - 1), 500);
        return;
    }


    console.log("Sending Task Update");
    stompClient.publish({
        
        destination: "/app/updateTask",
        body: JSON.stringify(task)
    })
}

export const connectWebSocket = () => {
    
    stompClient.activate();
}

const handleTaskUpdate = (updatedTask) => {
    console.log("Handling update of: " + updatedTask)
}

export {stompClient};



//Errors
stompClient.onStompError = (error) => {
    console.error("Stomp Error: " + error)
}

stompClient.onWebSocketError = (error) => {
    console.error("Websocket Error: " + error)
}
stompClient.onDisconnect = () => {
    console.log("STOMP disconnected")
}
stompClient.onWebSocketClose = () => {
    console.log("Websocket closed");
}
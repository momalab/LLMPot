import socket
import pandas as pd
from simplet5 import SimpleT5

model = SimpleT5()
model.load_model("byt5", "/home/dunia/ICSPot/outputs/simplet5-epoch-4-train-loss-0.4064-val-loss-0.4183", use_gpu=True)

serverSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
serverSocket.bind(("127.0.0.1", 5020))
serverSocket.listen()
print("Server ready for connection")

save_server_data = []
counters = []
counter_invalid = 0
counter_valid = 0
count = 0
context_list = []

try:
    while(True):

        try:
            (clientConnected, clientAddress) = serverSocket.accept()
            print("Accepted a connection request from %s:%s"%(clientAddress[0], clientAddress[1]))

            dataFromClient = clientConnected.recv(1024)
            print("dataFromClient is:", dataFromClient)
            
            #test with context
            count +=1
            print(f"Count: {count}")
            
            if count == 4:
                from transformers import ByT5Tokenizer
                tokenizer = ByT5Tokenizer.from_pretrained("google/byt5-small") 
                print("TEST WITH CONTEXT")
                #context = []
                question = dataFromClient.hex()
                print("hex:", dataFromClient.hex())
                print("hex:", question)

                print(f"context: {context}")
                inputs = model.tokenizer([context],[question], return_tensors="pt")
                print(f"inputs: {inputs}")
                output = tokenizer.decode(inputs['input_ids'][0])
                print(f"output: {output}")
                predicted_response = model.predict(output)
                print("Predicted packet response is:", predicted_response)
                
                clientConnected.sendall(bytes.fromhex(predicted_response))
                print("Send to client:", bytes.fromhex(predicted_response))

            else: 

                print("hex:", dataFromClient.hex())
                predicted_response = model.predict(dataFromClient.hex())[0]
                print("Predicted response is:", predicted_response)

                clientConnected.sendall(bytes.fromhex(predicted_response))
                print("Send to client:", bytes.fromhex(predicted_response))


            context_list.append([dataFromClient.hex(), predicted_response])
            context = pd.DataFrame(context_list, columns=['Query', 'Response'])

            save_server_data.append([dataFromClient, dataFromClient.hex(), predicted_response, bytes.fromhex(predicted_response)])
            counter_valid += 1 

        except Exception:
            counter_invalid += 1 
            print("Exception")
            clientConnected.sendall(bytes("Exception here", 'utf-8'))


        #Save all required data from server side
        counters.append([counter_valid, counter_invalid])
        counter_save = pd.DataFrame(counters, columns=['Valid', 'Invalid'])
        counter_save.to_csv('counter_server_1.csv', index=True)

        validation_server = pd.DataFrame(save_server_data, columns=['QueryReceived', 'QueryToModel', 'Prediction', 'ResponseSent'])
        validation_server.to_csv('validation_server_data_1.csv', index=True)
        
except KeyboardInterrupt:
    print("Client stopped by user.")
    serverSocket.shutdown(socket.SHUT_RDWR)
    serverSocket.close()
    print ("closed")
import socket
import json
import pandas as pd

test_set = pd.read_csv("testset.csv")
test_set.rename(columns = {'Unnamed: 0':'packet #'}, inplace = True)
test_set.rename(columns = {'source_text':'Query'}, inplace = True)
test_set.rename(columns = {'target_text':'Response'}, inplace = True)


save_client_data = []
counters = []
counter_invalid = 0
counter_valid = 0

try:
    for i in range(len(test_set)):
        clientSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        clientSocket.connect(("127.0.0.1", 5020))

        try:
            query = test_set['Query'][i]
            print('query is:', query)
            clientSocket.sendall(bytes.fromhex(query))
            print("bytes.fromhex is", bytes.fromhex(query))
            dataFromServer = clientSocket.recv(1024)
            print("dataFromServer is:", dataFromServer)

            save_client_data.append([query, bytes.fromhex(query), dataFromServer])
            
            if dataFromServer.hex()[0:15:1] == test_set['Response'][i][0:15:1]:
                counter_valid += 1 

            else:
                counter_invalid += 1
        
        except Exception:
            counter_invalid += 1
            print("Exception")

        #Save all required data from client side
        counters.append([counter_valid, counter_invalid])
        counter_save = pd.DataFrame(counters, columns=['Valid', 'Invalid'])
        counter_save.to_csv('counter_client_1.csv', index=True)

        validation_client = pd.DataFrame(save_client_data, columns=['Query', 'QuerySent', 'ResponseReceived'])
        validation_client.to_csv('validation_client_data_1.csv', index=True)

        clientSocket.close()

except KeyboardInterrupt:
    print("Client stopped by user.")

finally:
    clientSocket.close()
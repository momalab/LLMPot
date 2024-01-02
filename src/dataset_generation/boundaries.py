import argparse
import itertools
import statistics
import random
from mbtcp_requests import Mbtcp_Requests

class MbtcpClient:
    def __init__(self, server_address: str, server_port: int):
        self.mbtcp_requests = Mbtcp_Requests(server_address, server_port)
        
    @staticmethod
    def generate_request(sample, samples_num, element, single_data_value, multiple_data_value, max_elements, data):
        address = [x for x in range(0, (samples_num+1))] #100+1=101 / addresses: 0 - 100
        num_elements = [z for z in range(1, (max_elements+1))] #3+1=4 / elements: 1,2,3
        boolean_value = 2
        single_data_to_write = [y for y in range(0, single_data_value)] #10 / data: 0 -10
        single_data_to_write = [max(single_data_to_write), int(statistics.mean(single_data_to_write)), min(single_data_to_write)]
        
        for element in range(max_elements): 
            values_combinations = itertools.product(range(multiple_data_value), repeat=num_elements[element])
            all_combinations = list(values_combinations)
            
            if element == 0:
                min = all_combinations[0]
                max = all_combinations[-1]
                values = [x for x in all_combinations]
                values_without_boundaries = [val for val in values if val != min_val and val != max_val]
                random_midpoint = random.choice(values_without_boundaries)
                subset_boundaries_Z = [min, random_midpoint, max]
                            
            
            if element == 1:
                subsets = [[(i, j) for j in range(multiple_data_value)] for i in range(multiple_data_value)]
                X_groups = [[] for _ in range(int(len(all_combinations)/multiple_data_value))] #9/3 = 3
                
                for id, subset_x in enumerate(subsets):
                    subset_id = (id // (multiple_data_value)) * (multiple_data_value) + id % (multiple_data_value)
                    X_groups[subset_id].extend(subset_x)

                subset_boundaries_X = [[] for _ in range(int(len(all_combinations)/multiple_data_value))]
                for id, subset_x in enumerate(X_groups, start=1):
                    values = [x for x in subset_x]
                    min = subsets[id-1][0]
                    max = subsets[id-1][-1]
                    values_without_boundaries = [val for val in values if val != min and val != max]
                    random_midpoint = random.choice(values_without_boundaries)  
                    subset_boundaries_X[id-1] = [min, random_midpoint, max]


            elif element == 2:
                subset_groups = [[(i, j, k) for k in range(multiple_data_value)] for j in range(multiple_data_value) for i in range(multiple_data_value)]
                Y_groups = [[] for _ in range(int(len(all_combinations)/multiple_data_value))] #27/3 = 9

                for id, subset_y in enumerate(subset_groups):
                    subset_id = (id // (multiple_data_value)) * (multiple_data_value) + id % (multiple_data_value)
                    Y_groups[subset_id].extend(subset_y)

                subset_boundaries_Y = [[] for _ in range(int(len(all_combinations)/multiple_data_value))]
                for id, subset_y in enumerate(Y_groups, start=1):
                    values = [x for x in subset_y]
                    min = subset_groups[id-1][0]
                    max = subset_groups[id-1][-1]
                    values_without_boundaries = [val for val in values if val != min and val != max]
                    random_midpoint = random.choice(values_without_boundaries) 
                    subset_boundaries_Y[id-1] = [min, random_midpoint, max]
        
        # Convert list of lists to a single list
        subset_boundaries_X = [item for sublist in subset_boundaries_X for item in sublist]
        subset_boundaries_Y = [item for sublist in subset_boundaries_Y for item in sublist]
        boundaries = subset_boundaries_Z + subset_boundaries_X + subset_boundaries_Y
        
        coils_combinations = itertools.product(range(boolean_value), repeat=num_elements[element]) 
        
        return address[sample], num_elements[element], single_data_to_write[data], boundaries, coils_combinations
    
    def start_client(self, samples_num: int, single_data_value: int, multiple_data_value: int, max_elements: int, function_code: str):
        self.mbtcp_requests.connect_client()
        
        try:
            if (function_code == '1') or (function_code == '5'): 
                for element in range(1): #Explicitly for read/write single coil
                    for sample in range(samples_num):
                        address, num_elements, single_data_to_write, boundaries, coils_combinations = self.generate_request(sample, samples_num, element, single_data_value, multiple_data_value, max_elements, data=1)      
                        for coil in range(2):
                            value_to_write = [z for z in [True, False]]
                            self.mbtcp_requests.read_data("Read Single Coil", address, 1, num_elements=1)
                            self.mbtcp_requests.write_single_data("Write Single Coil", address, single_data_to_write, 5, value_to_write[coil])
                
            if (function_code == '3') or (function_code == '6'):
                for element in range(1): #Explicitly for read/write single register
                    for sample in range(samples_num):
                        for data in range(single_data_value):
                            address, num_elements, single_data_to_write, boundaries, coils_combinations = self.generate_request(sample, samples_num, element, single_data_value, multiple_data_value, max_elements, data)      
                            self.mbtcp_requests.read_data("Read Single Registers", address, 3, num_elements=1)
                            self.mbtcp_requests.write_single_data("Write Single Registers", address, single_data_to_write, 6, value_to_write=0)
                        self.mbtcp_requests.read_data("Read Single Registers", address, 3, num_elements=1)
                
            if function_code == '16':
                for element in range(max_elements): #Covers 1, 2, and 3 registers requests
                    for sample in range(samples_num): 
                        address, num_elements, single_data_to_write, boundaries, coils_combinations = self.generate_request(sample, samples_num, element, single_data_value, multiple_data_value, max_elements, data=1)      
                        for values_to_write in boundaries:
                            self.mbtcp_requests.read_data("Read Multiple Registers", address, 3, num_elements)
                            self.mbtcp_requests.write_multiple_data("Write Multiple Registers", address, values_to_write, 16)
                        self.mbtcp_requests.read_data("Read Multiple Registers", address, 3, num_elements)

            if function_code == '15':
                for element in range(max_elements): #Covers single, 2, and 3 coils requests
                    for sample in range(samples_num):
                        address, num_elements, single_data_to_write, boundaries, coils_combinations = self.generate_request(sample, samples_num, element, single_data_value, multiple_data_value, data=1)      
                        for coil_value in coils_combinations:
                            self.mbtcp_requests.read_data("Read Multiple Coils", address, 1, num_elements)
                            self.mbtcp_requests.write_multiple_data("Write Multiple Coils", address, coil_value, 15)

        except KeyboardInterrupt:
            print("Client stopped by user.")
        finally:
            self.mbtcp_requests.close_client()

def main():
    def list_of_strings(arg):
        return arg.split(',')
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="localhost", required=False)
    parser.add_argument('-p', default=502, required=False)
    parser.add_argument('-num', default=100, required=False) 
    parser.add_argument('-dat', default=10, required=False)
    parser.add_argument('-mul', default=10, required=False)
    parser.add_argument('-elem', default=3, required=False)
    parser.add_argument('-fun', default='3', required=False) #example: -fun 1,3,etc change type to list #OR for single test default='16' and False and type int
    args = parser.parse_args()

    server_address = args.ip
    server_port = int(args.p)
    samples_num = int(args.num) #regisers 0 to 99 > in the server keep it 103 because we add elements
    single_data_value = int(args.dat) #values 0 to 9
    multiple_data_value = int(args.mul) #values 0 to 9 > restrict the data in multiple registers
    max_elements = int(args.elem) #max 3 registers per packet
    function_code = args.fun #example: -fun 1,3
    
    mbtcp_client = MbtcpClient(server_address, server_port)
    mbtcp_client.start_client(samples_num, single_data_value, multiple_data_value, max_elements, function_code)

if __name__ == '__main__':
    main()
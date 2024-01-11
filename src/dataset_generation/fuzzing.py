# Note: activate ../boofuzz/.fuzz/bin/activate for this script to work
from boofuzz import *

def get_response(target, fuzz_data_logger, session, sock, *args, **kwargs):
    """
    Callback function to receive and log responses from the server.
    """
    try:
        response = sock.recv(1024)
        fuzz_data_logger.log_check(f'Received {len(response)} bytes of data from the server')
        if response:
            fuzz_data_logger.log_info(f"Response: {response.hex()}")
        else:
            fuzz_data_logger.log_info("No response received.")
    except Exception as e:
        fuzz_data_logger.log_error(f"Error receiving response: {e}")

def main():
    session = Session(
        target=Target(
            connection=TCPSocketConnection("localhost", 502)
        ),
        receive_data_after_fuzz=True,
        check_data_received_each_request=True,
        post_test_case_callbacks=[get_response]
    )

    s_initialize("ModbusTCP")

    s_word(value=0x0001, name='Transaction Identifier', endian=">", fuzzable=False)
    s_word(value=0x0000, name='Protocol Identifier', endian=">", fuzzable=False)
    s_word(value=0x0006, name='Length Placeholder', endian=">", fuzzable=False)
    s_byte(value=0x00, name='Unit Identifier', fuzzable=False)

    if s_block_start("ModbusPDU"):
        
        s_static("\x03", name="Function Code")  
        s_word(value=0x0000, name="Starting Address", endian=">", fuzz_values=[b'\x0001',b'\x0002',b'\x0003']) 
        s_word(value=0x0001, name="Quantity of Registers", endian=">", fuzzable=False)
            
    s_block_end()

    session.connect(s_get("ModbusTCP"))
    session.fuzz()

if __name__ == "__main__":
    main()

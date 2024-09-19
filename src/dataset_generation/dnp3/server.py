from scapy.all import *
import struct

# DNP3 packet definition (same as client-side)
class DNP3(Packet):
    name = "DNP3"
    fields_desc = [
        XByteField("start", 0x05),  # Start byte for DNP3
        XByteField("length", 0x0A),  # Length of the message
        XByteField("control", 0xC4),  # Control field (request)
        XShortField("destination", 0x0001),  # Destination address
        XShortField("source", 0x0002),  # Source address
        XByteField("crc", 0x00),  # Placeholder for CRC
        XByteField("function_code", 0x03),  # Function code (read/write)
        XShortField("group", 0x01),  # Object group (Binary Input)
        XShortField("variation", 0x01),  # Variation (single point)
        XByteField("status", 0x01),  # Status
        XByteField("value", 0x01)  # Value (On/Off)
    ]

    def post_build(self, p, pay):
        # Calculate CRC here if needed
        return p + pay

# Function to process incoming DNP3 packets
def handle_dnp3_packet(packet):
    if DNP3 in packet:
        dnp3_packet = packet[DNP3]
        print(f"Received DNP3 packet: {dnp3_packet.summary()}")

        # Check function code (e.g., 0x03 = Read, 0x0C = Write)
        if dnp3_packet.function_code == 0x03:
            # Handle Read Binary Inputs (coils)
            print("Read binary input request received.")
            send_dnp3_response(packet, read_response=True)

        elif dnp3_packet.function_code == 0x0C:
            # Handle Write Binary Outputs (coils)
            print(f"Write binary output request: {dnp3_packet.value}")
            send_dnp3_response(packet, write_response=True, coil_value=dnp3_packet.value)

# Function to send a DNP3 response
def send_dnp3_response(request_packet, read_response=False, write_response=False, coil_value=None):
    if read_response:
        # Send a response for the read request (binary input status)
        response = DNP3(start=0x05, length=0x0A, control=0xC4, destination=request_packet[DNP3].source,
                        source=request_packet[DNP3].destination, function_code=0x81, status=0x00, value=0x01)
        print("Sending DNP3 read response (status = ON).")

    elif write_response:
        # Send a response confirming the write request
        response = DNP3(start=0x05, length=0x0A, control=0xC4, destination=request_packet[DNP3].source,
                        source=request_packet[DNP3].destination, function_code=0x81, status=0x00, value=coil_value)
        print(f"Sending DNP3 write response (coil value = {coil_value}).")

    # Encapsulate in TCP/IP
    ip_packet = IP(dst=request_packet[IP].src) / TCP(sport=request_packet[TCP].dport, dport=request_packet[TCP].sport) / response
    send(ip_packet)

# Main server loop
def start_dnp3_server(bind_ip="0.0.0.0", bind_port=20000):
    print(f"Starting DNP3 server on {bind_ip}:{bind_port}")
    # sniff(filter=f"tcp port {bind_port}", iface="lo", prn=handle_dnp3_packet)

# Run the server
start_dnp3_server(bind_ip="0.0.0.0", bind_port=20000)

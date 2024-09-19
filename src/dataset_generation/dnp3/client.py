from scapy.all import *
import struct

# DNP3 over TCP (Layer 7) crafting
class DNP3(Packet):
    name = "DNP3"
    fields_desc = [
        XByteField("start", 0x05),  # Start byte for DNP3
        XByteField("length", 0x0A),  # Length of the message
        XByteField("control", 0xC4),  # Control field (request)
        XShortField("destination", 0x0001),  # Destination address
        XShortField("source", 0x0002),  # Source address
        XByteField("crc", 0x00),  # Placeholder for CRC
        XByteField("function_code", 0x03),  # Read function code
        XShortField("group", 0x01),  # Object group (Binary Input)
        XShortField("variation", 0x01),  # Variation (single point)
        XByteField("status", 0x01),  # Status
        XByteField("value", 0x01)  # Value (On/Off)
    ]

    def post_build(self, p, pay):
        # Calculate CRC here if needed
        return p + pay

# Sending a DNP3 read request for binary inputs (coils)
def send_dnp3_request(destination_ip, port=20000):
    dnp3_packet = DNP3(start=0x05, length=0x0A, control=0xC4, destination=0x0001, source=0x0002, function_code=0x03)
    packet = IP(dst=destination_ip) / TCP(dport=port) / dnp3_packet
    send(packet)

# Send the DNP3 request
destination_ip = '192.168.1.100'  # Replace with your PLC IP
send_dnp3_request(destination_ip)

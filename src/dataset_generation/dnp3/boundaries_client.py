from pycomm3 import LogixDriver

PLC_IP = "localhost"  # Change this to match your PLC's IP

# Connect to EtherNet/IP Server (Rockwell Logix PLC)
with LogixDriver(PLC_IP) as plc:
    print("Connected to PLC")

    # Read a Tag
    tag_value = plc.read("Tag1")
    print(f"Tag1 Value: {tag_value}")

    # Write a Tag
    plc.write("Tag1", 100)
    print("Updated Tag1 to 100")

    # Verify Write Operation
    new_value = plc.read("Tag1")
    print(f"New Tag1 Value: {new_value}")

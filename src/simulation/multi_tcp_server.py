import socketserver

import threading

ServerAddress = ("127.0.0.1", 5020)


class MyTCPClientHandler(socketserver.StreamRequestHandler):

    def handle(self):
        print("Receive one request from {}".format(self.client_address[0]))
        msg = self.rfile.readline().strip()
        print("Data Receive from client is:".format(msg))
        print(msg)
        print("Thread Name:{}".format(threading.current_thread().name))


TCPServerInstance = socketserver.ThreadingTCPServer(ServerAddress, MyTCPClientHandler)
TCPServerInstance.serve_forever()

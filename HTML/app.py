import threading
import time

def print_numbers():
    for i in range(5):
        print(f"Number: {i}")
        time.sleep(1)

def print_letters():
    for letter in 'abcde':
        print(f"Letter: {letter}")
        time.sleep(1)

# Create threads
thread1 = threading.Thread(target=print_numbers)
thread2 = threading.Thread(target=print_letters)

# Start threads
thread1.start()
thread2.start()

# Wait for threads to complete
thread1.join()
thread2.join()

print("Done!")

# import threading

# def write_to_file():
#     with open('shared_file.txt', 'a') as f:
#         for i in range(5):
#             f.write(f"Thread {threading.current_thread().name} writing {i}\n")

# thread1 = threading.Thread(target=write_to_file, name='Thread1')
# thread2 = threading.Thread(target=write_to_file, name='Thread2')

# thread1.start()
# thread2.start()

# thread1.join()
# thread2.join()

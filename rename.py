import os
 
# Function to rename multiple files
def main():
   
    folder = "D:\\batangmininft\\json"
    
    for filename in os.listdir(folder):
        file = os.path.splitext(filename)[0]
        dst = f"{int(file)}.json"
        src =f"{folder}/{filename}"
        dst =f"{folder}/{dst}"

        os.rename(src, dst)
        #print(src, dst)
 
# Driver Code
if __name__ == '__main__':
     
    # Calling main() function
    main()

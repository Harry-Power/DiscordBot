#Open both files
tempfile = open("username-temp.txt",'r+')
file = open("usernames.txt",'r+')

#Get contents of those files
tempFileContent = tempfile.read().split(",")
fileContent = file.read().split(",")
tempFileContent.pop(0) #exclude the first empty space

#loop through all of the suggestions
for i in tempFileContent:
    #check if those suggestions exist
    for x in fileContent:
        duplicate = False
        if i == x:
            print(i," is in both files")
            duplicate = True
    #If the suggestion doesn't exist ask the user if they want to add it
    if duplicate == False:
        question = "do you want to add \"" + i + "\"\n"
        uChoice = input(question)
        if uChoice == ("yes") or uChoice == ("y"):
            file.write(","+i)
            print(i," has been added")

tempfile.truncate(0)

print("Username check complete and temp file reset")

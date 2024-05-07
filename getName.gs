if active_user != "root" then exit("run as root.")

shell = get_shell
computer = shell.host_computer

wishFolder = computer.File(current_path + "/wishFolder")
if not wishFolder then computer.create_folder(current_path, "wishFolder")
wishFolderPath = computer.File(current_path + "/wishFolder").path

randomKey = function(length = 8, charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890")
    charlen = charset.len
    i = 0
    k = ""
    while i < length
        k = k + charset[floor(rnd * charlen)]
        i = i + 1
    end while
    return k
end function

letters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
lettersLen = letters.len
counter = 0
maxSize = 1/0
while true
    if counter % 100 == 0 then
        wishFolder = computer.File(current_path + "/wishFolder")
        if wishFolder then wishFolder.delete
        computer.create_folder(current_path, "wishFolder")
        computer.touch(wishFolder.path, "_.src")
        sourceFile = computer.File(wishFolderPath + "/" + "_.src")
        sourceFile.set_content(" ")
    end if
    currentName = randomKey(rnd * 8)
    sourceFile.rename(currentName + ".src")
    sourceFile = computer.File(wishFolderPath + "/" + currentName + ".src")
    shell.build(sourceFile.path, wishFolder.path)
    binaryFile = computer.File(wishFolder.path + "/" + currentName)
    if val(binaryFile.size) <= maxSize then
        maxSize = val(binaryFile.size)
        print("Smaller size found! name: <b>" + currentName + "</b> size: " + maxSize)
    end if
    counter = counter + 1
end while
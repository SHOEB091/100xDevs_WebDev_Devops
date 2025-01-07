# Command Reference Guide

This guide provides a comprehensive list of commonly used commands along with their descriptions and examples.

---

## General Commands
- **`pwd`**  
  Displays the current working directory.  

- **`ls`**  
  Lists files and directories in the current folder.  

- **`ls -R`**  
  Lists files in directories and their subdirectories.

- **`ls -t`**  
  Lists files sorted by the time they were last modified.

- **`ls -l`**  
  Displays details like permissions, size, and modification date.

- **`ls -lt`**  
  Combines `-l` and `-t` to list details, sorted by modification time.

- **`ls -la`**  
  Lists all items, including hidden files.

- **`ls -lRa`**  
  Combines `-l`, `-R`, and `-a` to list detailed information recursively for all files, including hidden ones.

- **`ls -lr`**  
  Lists files in reverse order.

- **`ls -s`**  
  Displays the size of files.

- **`ls *.js`**  
  Lists all JavaScript files in the directory.

- **`ls Zoo*`**  
  Lists all files with names starting with "Zoo".

- **`ls ..`**  
  Lists files in the parent directory.

---

## Directory Navigation
- **`cd`**  
  Change to a specified directory.  

- **`cd ..`**  
  Move to the parent directory.  

- **`cd ../../`**  
  Move up two levels in the directory structure.  

---

## File Operations
- **`touch filename`**  
  Creates a new file.  

- **`cat filename`**  
  Displays the content of a file.  

- **`cat > filename`**  
  Writes content to a file. Press `Ctrl + D` to save.  

- **`cat >> filename`**  
  Appends content to a file.  

---

## Directory Management
- **`mkdir dirname`**  
  Creates a new directory.  

- **`mkdir dirname && cd dirname`**  
  Creates a directory and navigates into it.  

- **`mkdir -p parent/child`**  
  Creates nested directories.  

---

## File and Directory Manipulation
- **`mv source destination`**  
  Moves or renames a file.  

- **`cp source destination`**  
  Copies a file.  

- **`cp -r source destination`**  
  Copies a directory.  

- **`rm filename`**  
  Deletes a file.  

- **`rm -r dirname`**  
  Deletes a directory.  

---

## Permissions
- **`chmod ugo-rwx filename`**  
  Removes all permissions for the file.  

- **`chmod -R ugo-rwx dirname`**  
  Removes permissions recursively for a directory.  

- **`chmod u+x filename`**  
  Adds execute permission for the user.  

- **`chmod 664 filename`**  
  Sets file permissions to `rw-rw-r--`.

---

## Viewing File Content
- **`head filename`**  
  Displays the first 10 lines of a file.  

- **`tail filename`**  
  Displays the last 10 lines of a file.  

- **`head -20 filename`**  
  Displays the first 20 lines of a file.  

- **`tail -n +25 filename | head -n +5`**  
  Displays 5 lines starting from the 25th line.  

- **`wc filename`**  
  Counts lines, words, and characters in a file.  

---

## Search and Filter
- **`grep "text" filename`**  
  Searches for lines containing "text" in a file.  

- **`grep -c "text" filename`**  
  Counts occurrences of "text" in a file.  

- **`grep -hi "text" filename`**  
  Case-insensitive search for "text".  

- **`grep -hin "text" filename`**  
  Displays matched lines with line numbers (case-insensitive).  

- **`grep -w "word" filename`**  
  Matches only whole words.  

---

## Text Processing
- **`sed -n '/ERROR/ p' filename`**  
  Prints lines containing "ERROR".  

- **`sed 's/old/new/' filename`**  
  Replaces the first occurrence of "old" with "new".  

- **`awk '/ERROR/{print $0}' filename`**  
  Prints lines containing "ERROR".  

- **`awk '{print $1, $2}' filename`**  
  Prints the first and second columns of a file.  

---

## Additional Utilities
- **`history`**  
  Displays a list of recently used commands.  

- **`echo "message"`**  
  Outputs a message to the terminal.  

---



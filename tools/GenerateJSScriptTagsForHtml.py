import os
import sys
from collections import defaultdict

def find_js_files(directory):
    js_files = defaultdict(list)  # Dictionary to group files by their folder
    # Walk the directory recursively
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.js'):
                # Get the relative path to the JS file and group by the folder name
                folder = os.path.relpath(root, directory)
                if folder == ".":
                    folder = ""  # Handle case where the file is directly in the root directory
                js_files[folder].append(os.path.relpath(os.path.join(root, file), start=directory))
    return js_files

def generate_html_script_tags(js_files):
    script_tags = []
    for folder, files in js_files.items():
        # Add a comment for the folder
        if folder:
            script_tags.append(f'<!-- Scripts in folder: {folder} -->')
        else:
            script_tags.append('<!-- Scripts in root directory -->')

        # Generate <script> tags for each file in the folder
        for js_file in files:
            script_tags.append(f'<script src="{js_file}"></script>')

    return "\n".join(script_tags)

def main(directory):
    # Get all .js files grouped by folder from the directory
    js_files = find_js_files(directory)

    if js_files:
        # Generate the <script> tags for the found .js files
        html_content = generate_html_script_tags(js_files)
        # Write to the output HTML file in the current working directory
        with open("scriptTagsGenerated.html", "w") as f:
            f.write("<!DOCTYPE html>\n<html>\n<head>\n<title>My Scripts</title>\n</head>\n<body>\n")
            f.write(html_content)
            f.write("\n</body>\n</html>")
        print("HTML file with script tags has been created.")
    else:
        print("No .js files found in the given directory.")

if __name__ == '__main__':
    # Check if the directory is passed as an argument
    if len(sys.argv) < 2:
        print("Please provide the directory path as an argument.")
    else:
        directory = sys.argv[1]
        main(directory)

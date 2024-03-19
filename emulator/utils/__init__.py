import os


def find_project_root(current_file):
    root_dir = os.path.dirname(os.path.abspath(current_file))
    while not os.path.exists(os.path.join(root_dir, 'requirements.txt')):
        root_dir = os.path.dirname(root_dir)
        if root_dir == '/':
            raise FileNotFoundError("Could not find the project root.")
    return root_dir


DIR = find_project_root(__file__)
print(DIR)

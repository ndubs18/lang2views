#!~/.pyenv/versions/spleeter-env/bin/python
import sys
import os
from spleeter.separator import Separator

def remove_vocals(input_file, output_dir):
    # Initialize Spleeter separator
    separator = Separator('spleeter:2stems')

    # Perform separation
    separator.separate_to_file(input_file, output_dir)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python remove_vocals.py <input_file> <output_dir>")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_dir = sys.argv[2]

    remove_vocals(input_file, output_dir)
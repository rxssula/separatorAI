import os
import sys
import subprocess
import ssl

def separate(audio_path, output_path):
    ssl._create_default_https_context = ssl._create_unverified_context
    cmd = [
        sys.executable,  # Path to the Python interpreter
        "-m", "demucs",
        audio_path,
        "-o", output_path,
        "-n", "hdemucs_mmi",  # Specify the model
        "--filename", "{track}_{stem}.{ext}"  # Set output filename format
    ]
    try:
        result = subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
    except subprocess.CalledProcessError as e:
        print("Error during separation:", e)
        print("stdout:", e.stdout.decode('utf-8'))
        print("stderr:", e.stderr.decode('utf-8'))

if __name__ == "__main__":
    try:
        audio_path = sys.argv[1]
        output_path = sys.argv[2]
        separate(audio_path, output_path)
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        import traceback
        print(traceback.format_exc())

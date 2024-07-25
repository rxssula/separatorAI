import os
import sys
import subprocess
import ssl

def separate(audio_path, output_path):
    ssl._create_default_https_context = ssl._create_unverified_context
    unique_id = os.path.splitext(os.path.basename(audio_path))[0]  # Extract unique ID from filename
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
        print("stdout:", result.stdout.decode('utf-8'))
        print("stderr:", result.stderr.decode('utf-8'))
        
        # Rename output files to include the unique ID
        output_dir = os.path.join(output_path, "hdemucs_mmi", os.path.splitext(os.path.basename(audio_path))[0])
        for filename in os.listdir(output_dir):
            new_filename = f"{unique_id}_{filename}"
            os.rename(os.path.join(output_dir, filename), os.path.join(output_dir, new_filename))
        
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

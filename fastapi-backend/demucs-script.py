import sys
import subprocess

def separate(audio_path, output_path):
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
        print(result.stdout.decode('utf-8'))
        print(result.stderr.decode('utf-8'))
    except subprocess.CalledProcessError as e:
        print("Error during separation:", e)
        print("stdout:", e.stdout.decode('utf-8'))
        print("stderr:", e.stderr.decode('utf-8'))

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: demucs-script.py <audio_path> <output_path>")
        sys.exit(1)
    audio_path = sys.argv[1]
    output_path = sys.argv[2]
    separate(audio_path, output_path)

import sys
import subprocess
import os

def download_audio(youtube_url, download_dir):
    cmd = [
        'yt-dlp',
        '-x',
        '--audio-format', 'mp3',
        '-o',
        os.path.join(download_dir, '%(id)s.%(ext)s'),
        youtube_url
    ]

    try:
        result = subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        output = result.stdout.decode('utf-8')
        error_output = result.stderr.decode('utf-8')

        # Print the full output for debugging purposes
        print("yt-dlp stdout:", output)
        print("yt-dlp stderr:", error_output)


    except subprocess.CalledProcessError as e:
        print("Error during audio download:", e)
        print("stdout:", e.stdout.decode('utf-8'))
        print("stderr:", e.stderr.decode('utf-8'))
        sys.exit(1)

if __name__ == "__main__":
    youtube_url = sys.argv[1]
    download_dir = sys.argv[2]
    download_audio(youtube_url, download_dir)

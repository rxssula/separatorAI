from fastapi import FastAPI, File, UploadFile, BackgroundTasks
from fastapi.responses import FileResponse
import subprocess
import os
import shutil
from pathlib import Path
import zipfile
import logging

app = FastAPI()
logging.basicConfig(level=logging.INFO)

def cleanup_files(file_location: str, output_path: str, zip_file_path: str):
    try:
        if os.path.exists(file_location):
            os.remove(file_location)
        if os.path.exists(output_path):
            shutil.rmtree(output_path)
        if os.path.exists(zip_file_path):
            os.remove(zip_file_path)
    except Exception as e:
        logging.error(f"Error during cleanup: {str(e)}")

@app.post("/process/")
async def process_file(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    try:
        # Save the uploaded file to a temporary location
        file_location = f"/tmp/{file.filename}"
        with open(file_location, "wb") as f:
            f.write(await file.read())
        logging.info(f"File saved to {file_location}")

        temp_output_path = "/tmp/output"
        os.makedirs(temp_output_path, exist_ok=True)
        logging.info(f"Output directory created at {temp_output_path}")

        # Run the Demucs script
        cmd = [
            "python3", 
            "-m", "demucs", 
            file_location, 
            "-o", temp_output_path, 
            "-n", "hdemucs_mmi", 
            "--filename", "{track}_{stem}.{ext}"
        ]
        logging.info(f"Running command: {' '.join(cmd)}")

        result = subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        logging.info(f"Demucs script completed with output: {result.stdout.decode('utf-8')}")
        logging.error(f"Demucs script errors: {result.stderr.decode('utf-8')}")

        # Create a zip file containing the separated tracks
        zip_file_path = f"/tmp/{file.filename}_separated.zip"
        with zipfile.ZipFile(zip_file_path, 'w') as zipf:
            for root, _, files in os.walk(temp_output_path):
                for filename in files:
                    file_path = os.path.join(root, filename)
                    zipf.write(file_path, arcname=os.path.relpath(file_path, temp_output_path))
        logging.info(f"Zip file created at {zip_file_path}")

        # Add cleanup task
        background_tasks.add_task(cleanup_files, file_location, temp_output_path, zip_file_path)
        logging.info("Cleanup task added")

        # Return the zip file as the response
        return FileResponse(zip_file_path, media_type='application/zip', filename=f"{file.filename}_separated.zip")

    except subprocess.CalledProcessError as e:
        logging.error(f"Subprocess error: {e}")
        logging.error(f"Subprocess stdout: {e.stdout.decode('utf-8')}")
        logging.error(f"Subprocess stderr: {e.stderr.decode('utf-8')}")
        return {"error": str(e), "stdout": e.stdout.decode('utf-8'), "stderr": e.stderr.decode('utf-8')}
    except Exception as e:
        logging.error(f"General error: {e}")
        return {"error": str(e)}


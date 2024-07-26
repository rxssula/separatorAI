import subprocess
import logging

@app.post("/process/")
async def process_file(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    try:
        file_location = f"/tmp/{file.filename}"
        with open(file_location, "wb") as f:
            f.write(await file.read())
        logging.info(f"File saved to {file_location}")

        temp_output_path = "/tmp/output"
        os.makedirs(temp_output_path, exist_ok=True)
        logging.info(f"Output directory created at {temp_output_path}")

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
        logging.info(f"Demucs script output: {result.stdout.decode('utf-8')}")
        logging.error(f"Demucs script errors: {result.stderr.decode('utf-8')}")

        zip_file_path = f"/tmp/{file.filename}_separated.zip"
        with zipfile.ZipFile(zip_file_path, 'w') as zipf:
            for root, _, files in os.walk(temp_output_path):
                for filename in files:
                    file_path = os.path.join(root, filename)
                    zipf.write(file_path, arcname=os.path.relpath(file_path, temp_output_path))
        logging.info(f"Zip file created at {zip_file_path}")

        background_tasks.add_task(cleanup_files, file_location, temp_output_path, zip_file_path)
        logging.info("Cleanup task added")

        return FileResponse(zip_file_path, media_type='application/zip', filename=f"{file.filename}_separated.zip")

    except subprocess.CalledProcessError as e:
        logging.error(f"Subprocess error: {e}")
        return {"error": str(e), "stdout": e.stdout.decode('utf-8'), "stderr": e.stderr.decode('utf-8')}
    except Exception as e:
        logging.error(f"General error: {e}")
        return {"error": str(e)}

# Use the official Python image
FROM python:latest

# Set the working directory where the app will be mounted
WORKDIR /myapp

# Install Python dependencies
COPY requirements.txt /
RUN pip install --no-cache-dir -r /requirements.txt

# Copy the entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Set the default command to run your script
# This will execute SendEmail.py from the mounted /myapp directory
ENTRYPOINT ["/entrypoint.sh"]

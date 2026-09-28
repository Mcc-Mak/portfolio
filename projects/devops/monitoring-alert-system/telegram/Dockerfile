FROM mongo:6.0

# Install Python 3 and pip
RUN apt-get update && \
    apt-get install -y python3 python3-pip nano wget curl && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /myapp

# Install Python dependencies
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy the entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Environment variables (defaults)
ENV MONGO_URI=mongodb://localhost:27017/ \
    MONGO_DB_NAME=telegram_bot \
    THRESHOLD=200 \
    INTERVAL=

ENTRYPOINT ["/entrypoint.sh"]
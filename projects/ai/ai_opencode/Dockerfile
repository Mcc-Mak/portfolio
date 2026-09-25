# ============================================
# OpenCode Server with MCP + SDLC Framework
# Base: Node.js 20 Alpine (lightweight)
# ============================================
FROM node:20-alpine

# --------------------------------------------------
# Build-time arguments (passed via docker build)
# These are used to configure the environment
# --------------------------------------------------
ARG DIR_WORKSPACE
ARG DIR_OPENCODE
ARG DIR_OPENCODE_MCP
ARG DIR_OPENCODE_G_CONFIG
ARG HKOAI_API_KEY
ARG MYSQL_HOST
ARG MYSQL_PORT
ARG MYSQL_USER
ARG MYSQL_PASSWORD

# --------------------------------------------------
# Environment variables (available at runtime)
# --------------------------------------------------
ENV NODE_TLS_REJECT_UNAUTHORIZED=0 \
    DIR_WORKSPACE=${DIR_WORKSPACE} \
    DIR_OPENCODE=${DIR_OPENCODE} \
    DIR_OPENCODE_MCP=${DIR_OPENCODE_MCP} \
    DIR_OPENCODE_G_CONFIG=${DIR_OPENCODE_G_CONFIG} \
    HKOAI_API_KEY=${HKOAI_API_KEY} \
    MYSQL_HOST=${MYSQL_HOST} \
    MYSQL_PORT=${MYSQL_PORT} \
    MYSQL_USER=${MYSQL_USER} \
    MYSQL_PASSWORD=${MYSQL_PASSWORD} \
    PATH="${DIR_OPENCODE}/bin:${PATH}"

# --------------------------------------------------
# Set user and working directory
# --------------------------------------------------
USER root
WORKDIR ${DIR_WORKSPACE}

# --------------------------------------------------
# Install system dependencies
# - curl/bash: for scripting and health checks
# - python3/pip: for Python-based MCP servers
# - git/github-cli: for version control integration
# --------------------------------------------------
RUN apk add --no-cache \
    curl \
    bash \
    python3 \
    py3-pip \
    git \
    github-cli

# --------------------------------------------------
# Install OpenCode CLI
# Official installer script from opencode.ai
# --------------------------------------------------
RUN curl -fsSL https://opencode.ai/install | bash

# --------------------------------------------------
# Install Language Servers
# - intelephense: PHP language server
# --------------------------------------------------
RUN npm install -g intelephense

# --------------------------------------------------
# Install Global MCP Servers
# - server-filesystem: File system access for agents
# - mysql-mcp-server: MySQL database integration
# --------------------------------------------------
RUN npm install -g \
    @modelcontextprotocol/server-filesystem \
    mysql-mcp-server

# --------------------------------------------------
# Copy OpenCode configuration file
# Note: Uses .jsonc extension for JSON with comments
# --------------------------------------------------
COPY opencode.json ${DIR_OPENCODE_G_CONFIG}/opencode.jsonc

# --------------------------------------------------
# Set proper permissions for the opencode config
# --------------------------------------------------
RUN chown -R root:root ${DIR_OPENCODE_G_CONFIG} && \
    chmod -R 755 ${DIR_OPENCODE_G_CONFIG}

# --------------------------------------------------
# Healthcheck to monitor server status
# --------------------------------------------------
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:80/health || exit 1

# --------------------------------------------------
# Startup command
# Note: CMD does NOT expand environment variables directly.
# Using shell form to evaluate ${DIR_OPENCODE}
# Configuration can be overridden via volume mount
# --------------------------------------------------
CMD ["/bin/sh", "-c", "${DIR_OPENCODE}/bin/opencode serve --port 80 --hostname 0.0.0.0"]

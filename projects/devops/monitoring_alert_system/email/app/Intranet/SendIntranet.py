#!/usr/bin/env python3
"""
SendIntranet.py - Send email using internal (intranet) SMTP.
Usage:
    python3 SendIntranet.py                         # uses latest YAML in ./yaml/
    python3 SendIntranet.py --config /path/to/file.yaml
    python3 SendIntranet.py --config ../Internet/yaml/GMAIL_{yyyyMMddHHMMSS}.yaml
"""

import smtplib
from email.mime.text import MIMEText
from email.utils import formatdate
import logging
import sys
import os
import glob
import yaml

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ============================================================
#  Intranet SMTP Settings – from environment variables
# ============================================================
def get_smtp_settings():
    """Return intranet SMTP settings from environment variables."""
    return {
        'host': os.getenv('INTRANET_SMTP_HOST', None),
        'port': int(os.getenv('INTRANET_SMTP_PORT', None)),
        'user': os.getenv('INTRANET_SMTP_USER', None),
        'password': os.getenv('INTRANET_SMTP_PASSWORD', None),
        'use_tls': os.getenv('INTRANET_SMTP_USE_TLS', None).lower() in ('true', '1', 'yes')
    }


# ============================================================
#  Email sending function (same as before)
# ============================================================
def send_email(to: str, subject: str, body: str,
               from_addr: str = None,
               smtp_host: str = None,
               smtp_port: int = None,
               smtp_user: str = None,
               smtp_password: str = None,
               use_tls: bool = True) -> bool:
    """Send an email using SMTP."""
    if from_addr is None:
        from_addr = smtp_user

    msg = MIMEText(body, 'plain', 'utf-8')
    msg['From'] = from_addr
    msg['To'] = to
    msg['Subject'] = subject
    msg['Date'] = formatdate(localtime=True)

    try:
        logger.info(f"Connecting to {smtp_host}:{smtp_port} (TLS: {use_tls})")
        server = smtplib.SMTP(smtp_host, smtp_port)
        if use_tls:
            server.starttls()
        
        print(locals())
        
        if smtp_user and smtp_password:
            logger.info(f"Authenticating as {smtp_user}")
            server.login(smtp_user, smtp_password)
        logger.info(f"Sending email to {to}")
        server.sendmail(from_addr, [to], msg.as_string())
        server.quit()
        logger.info("Email sent successfully.")
        return True
    except smtplib.SMTPAuthenticationError:
        logger.error("Authentication failed. Check SMTP_USER and SMTP_PASSWORD.")
    except smtplib.SMTPException as e:
        logger.error(f"SMTP error: {e}")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
    return False


# ============================================================
#  YAML loading and email extraction (identical to SendGmail.py)
# ============================================================
def load_yaml(filepath: str) -> dict:
    try:
        with open(filepath, 'r') as f:
            return yaml.safe_load(f)
    except Exception as e:
        logger.error(f"Failed to load YAML: {e}")
        sys.exit(1)


def get_latest_yaml(directory: str = "./yaml") -> str:
    pattern = os.path.join(directory, "*.yaml")
    files = glob.glob(pattern)
    if not files:
        logger.error(f"No YAML files found in {directory}")
        sys.exit(1)
    latest = max(files, key=os.path.getmtime)
    logger.info(f"Using latest YAML: {latest}")
    return latest


# ============================================================
#  Main
# ============================================================
def main():
    import argparse
    parser = argparse.ArgumentParser(description="Send intranet email from YAML config.")
    parser.add_argument("--config", help="Path to YAML configuration file")
    args = parser.parse_args()

    # Determine YAML file path
    if args.config:
        yaml_path = args.config
    else:
        # Look in ./yaml/ relative to this script's location
        script_dir = os.path.dirname(os.path.abspath(__file__))
        yaml_dir = os.path.join(script_dir, "yaml")
        yaml_path = get_latest_yaml(yaml_dir)

    config = load_yaml(yaml_path)
    email_config = config.get('email')
    if not email_config:
        logger.error("YAML must contain a top-level 'email' key with 'from', 'to', 'subject', 'body'.")
        sys.exit(1)

    from_addr = email_config.get('from')
    to = email_config.get('to')
    subject = email_config.get('subject')
    body = email_config.get('body')

    if not all([from_addr, to, subject, body]):
        logger.error("Missing one of: from, to, subject, body in the YAML.")
        sys.exit(1)

    smtp = get_smtp_settings()

    success = send_email(
        to=to,
        subject=subject,
        body=body,
        from_addr=from_addr,
        smtp_host=smtp['host'],
        smtp_port=smtp['port'],
        smtp_user=smtp['user'],
        smtp_password=smtp['password'],
        use_tls=smtp['use_tls']
    )

    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
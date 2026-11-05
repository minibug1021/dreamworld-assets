#!/usr/bin/env python3

import argparse
import sys
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import urlretrieve

BASE_URL = "https://assets.pokemon.com"


def main():
    parser = argparse.ArgumentParser(
        description="Download an assets.pokemon.com file into the matching local directory."
    )
    parser.add_argument("url", help="URL to download")

    args = parser.parse_args()

    if not args.url.startswith(BASE_URL):
        print(f"Error: URL must begin with {BASE_URL}", file=sys.stderr)
        sys.exit(1)

    parsed = urlparse(args.url)

    # Directory containing this script (assumed to be assets.pokemon.com/)
    root = Path(__file__).resolve().parent

    # Remove leading slash from URL path
    relative_path = parsed.path.lstrip("/")

    destination = root / relative_path

    # Create parent directories
    destination.parent.mkdir(parents=True, exist_ok=True)

    if destination.exists():
        print(f"Already exists: {destination}")
        return

    print(f"Downloading {args.url}")
    urlretrieve(args.url, destination)
    print(f"Saved to {destination}")


if __name__ == "__main__":
    main()

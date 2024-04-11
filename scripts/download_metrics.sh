#!/usr/bin/bash

echo "Enter SSH Password: "
read -s SSH_PASS

find . -name metrics.csv -type f | while read -r file; do
    parent_dir=$(dirname "$file")
    grandparent_dir_name=$(basename "$(dirname "$parent_dir")")
    echo "Copying $file to $1:/Users/cv43/nyuad/source/ICSPot/checkpoints/${grandparent_dir_name}_metrics.csv"
    sshpass -p "$SSH_PASS" scp "$file" "cv43@$1:/Users/cv43/nyuad/source/ICSPot/checkpoints/${grandparent_dir_name}_metrics.csv"
done
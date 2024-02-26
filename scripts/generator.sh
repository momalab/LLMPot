#!/bin/bash

sudo -v
export PYTHONPATH=~/nyuad/source/ICSPot/src
pyenv local icspot-venv

EXPERIMENT_FILE=../experiments/$1

DUMPS=../outputs/datasets/dumps
PARSED=../outputs/datasets/parsed
DATASET_GENERATION=../src/dataset_generation
PROCESS_CONTROL=$DATASET_GENERATION/$5

cleanup() {
  echo "Caught Ctrl+C, stopping all spawned processes..."
  kill -- -$$
  exit 1
}

trap cleanup SIGINT

SIZES=$(cat "$EXPERIMENT_FILE" | cut -d"-" -f4 | sort -u)
PROTOCOL=$(cat "$EXPERIMENT_FILE" | cut -d"-" -f1 | sort -u)
PROCESS=$(cat "$EXPERIMENT_FILE" | cut -d"-" -f2 | sort -u)

while IFS= read -r size; do

  if [ -f $DUMPS/"$PROTOCOL"-"$PROCESS"-"$size".pcap ]; then
    echo "File: $PROTOCOL-$PROCESS-$size.pcap exists, continuing to next iteration."
    continue
  fi

  sudo tcpdump -s 0 -i lo0 -w $DUMPS/"$PROTOCOL"-"$PROCESS"-"$size".pcap > /dev/null 2>&1 &
  tcp_dump_pid=$!
  sleep 1

  python "$PROCESS_CONTROL"/"$PROCESS"_server.py > /dev/null 2>&1 &
  server_pid=$!
  sleep 1

  python "$PROCESS_CONTROL"/"$PROCESS"_client.py -num "$size" &
  client_pid=$!
  wait $client_pid

  sleep 3

  kill $server_pid
  wait $server_pid

  kill $tcp_dump_pid
  wait $tcp_dump_pid

  sudo chown "$(id -u)":"$(id -g)" $DUMPS/"$PROTOCOL"-"$PROCESS"-"$size".pcap
done <<< "$SIZES"

while IFS= read -r line; do
  IFS='-' read -r -a part <<< "$line"
  echo "Processing file: $line ..."

  if [ -f "$PARSED/$line".csv ]; then
    echo "File: $line exists, continuing to next iteration."
    continue
  fi

  python $DATASET_GENERATION/parse.py -pr "$2" -layer "$3" -p "$4" -pcap "${part[0]}"-"${part[1]}"-"${part[3]}" -csv "$line" -clen "${part[2]:1:1}" &
  parse_pid=$!
  wait $parse_pid
  parser_status=$?

  if [ $parser_status -eq 0 ]; then
    echo "File: $line successfully generated."
  fi

  python $DATASET_GENERATION/split.py -csv "$line" &
  split_pid=$!
  wait $split_pid
done < "$EXPERIMENT_FILE"

echo "Generation Complete."

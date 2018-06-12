#!/usr/bin/env bash

# setup default env values
INDEX_HTML_PATH=${INDEX_HTML_PATH:-''}
BASE_PATH=${BASE_PATH:-'/'}
UI_VARS=${UI_VARS:-''}
OUTPUT_PATH=${OUTPUT_PATH:-'env.json'}


# Build environment JSON for App
## transform comma-delimited list into array
OLDIFS=$IFS
IFS=","
ENVS=($UI_VARS)
IFS=$OLDIFS

## build json string
ENVIRONMENT=""
for ((i=0; i<${#ENVS[@]}; ++i)); do

  # if not the first iteration, add comma to end of string
  if [ $i != 0 ]; then
    ENVIRONMENT="${ENVIRONMENT}, "
  fi

  # get the ENV's value
  VAL=$(eval "echo \$${ENVS[i]}")
  # add to json string
  ENVIRONMENT="${ENVIRONMENT}\"${ENVS[i]}\": \"${VAL}\""
done
## finalize json string
ENVIRONMENT="{ ${ENVIRONMENT} }"

## output env json
echo $ENVIRONMENT > $OUTPUT_PATH
echo "Built env.json with: ${UI_VARS}"


# Update index.html file
if [ -n "$INDEX_HTML_PATH" ]; then
  sed -i.bak "s#<base href=.*#<base href=\"${BASE_PATH}\">#;" $INDEX_HTML_PATH
  echo "Updated index.html with BASE_PATH: ${BASE_PATH}"
fi

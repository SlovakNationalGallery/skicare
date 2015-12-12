#!/bin/bash

# set properties
source properties.sh

# go to build dir
cd build/$APP_NAME

# run app in emulator
cordova run $PLATFORM
# cordova run ios --target="iPad-Air"
# cordova run ios --devicetypeid="iPad-Air"

# go to root dir
cd ../..
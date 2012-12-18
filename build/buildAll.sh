# Note: You must have Java installed, and the Java executable must be in your PATH variable.
./buildSource.sh

pushd ../tests
./buildTests.sh
popd

rm -rf build
rm -rf tms-app-build

echo "Installing Dependency"
npm install
npm run build

mkdir tms-app-build
cp -r build/* tms-app-build/
echo "Build ready inside tms-app-build 🚀"

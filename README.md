
# Inventory Management App

This is a mobile and mock backend server project for inventory management, built with React Native and Node.js (Express).

## Prerequisites

- Node.js
- npm
- Expo CLI (`npm install -g expo-cli`)
- EAS CLI (`npm install -g eas-cli`)

## Installation

To install all necessary packages:

```bash
npm install
```

> All dependencies are defined in `package.json`. You do not need to install them one by one using `expo install`.

## Usage

### Run the mobile app

```bash
npx expo start
```

Scan the QR code with the Expo Go app on your mobile device.

### Publish to Expo Go

```bash
npx eas login           # if not already logged in
npx eas update:configure # (if needed)
npx eas update --branch preview
```

Repeat the last command after each update.

### Start the mock server

```bash
# Create and navigate to a project folder
mkdir inventoryServer
cd inventoryServer

# Initialize the Node.js project
npm init -y

# Install necessary packages
npm install express multer cors

# Create `server.js` with mock upload/product APIs
```

`server.js` includes:

- Image upload (via `/upload`)
- Product storage (`/products`)
- Image hosting (`/uploads`)
- IP address auto-detection

Start the server:

```bash
node server.js
```

Your mock API will be available at:

```
Upload Image       : http://192.168.x.x:5000/upload
View Uploaded Image: http://192.168.x.x:5000/uploads/image.jpg
Create Product     : http://192.168.x.x:5000/products
Get Products       : http://192.168.x.x:5000/products
```

Replace `192.168.x.x` with your actual local IP.

## Notes

- If you encounter QR scan errors or preview issues, verify your network and Expo account.
- The mock server uses `multer` for image upload and `cors` to handle cross-origin requests.

## License

MIT

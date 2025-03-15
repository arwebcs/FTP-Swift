const ftp = require("basic-ftp");

async function uploadFiles() {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  const server = process.env.FTP_SERVER;
  const username = process.env.FTP_USERNAME;
  const password = process.env.FTP_PASSWORD;
  const localDir = process.env.LOCAL_DIR || ".";
  const remoteDir = process.env.REMOTE_DIR || "/";

  const isSSL = server.startsWith("ftps://");
  const port = process.env.FTP_PORT
    ? parseInt(process.env.FTP_PORT, 10)
    : isSSL
    ? 990
    : 21;
  const secure = isSSL;

  const cleanServer = server.replace(/^ftps?:\/\//, "");

  console.log(
    `Connecting to FTP server: ${cleanServer} on port ${port} (Secure: ${secure})`
  );

  try {
    await client.access({
      host: cleanServer,
      user: username,
      password: password,
      secure: secure,
      port: port,
    });

    console.log("Connected! Uploading...");
    await client.ensureDir(remoteDir);
    await client.uploadFromDir(localDir);

    console.log(`Upload successful! Files have been uploaded to: ${remoteDir}`);
  } catch (err) {
    console.error("FTP Upload failed:", err);
    process.exit(1);
  } finally {
    client.close();
  }
}

uploadFiles();

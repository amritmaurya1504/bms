import app from "./app";

const startServer = async () => {
  const port = 9000;

  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};

startServer();
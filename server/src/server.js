const app =require('./app')

app.listen(process.env.SERVER_PORT, () => {
  console.log(`[*] Server running on port: ${process.env.SERVER_PORT}`);
});

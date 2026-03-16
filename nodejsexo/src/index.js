import http from "node:http";
import fs from "fs/promises";

const server = http.createServer( async (req, res) => {
  if (req.url === "/") {
    try {
    const data = await fs.readFile(new URL('./index.html', import.meta.url), "utf-8");
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(data)
  } catch (err) {
    console.error("Error during reading index.html file",err);
     res.writeHead(500, {"Content-Type": "text/plain; charset=utf-8"});
  }
  } else {
    res.writeHead(404, {"Content-Type": "text/plain; charset=utf-8"});
    res.end("wrong endpoint")
  }

  return;
});


server.listen(3000, () => {
    console.log("server runing at localhost:3000");
})
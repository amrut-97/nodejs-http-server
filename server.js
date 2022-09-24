import http from "http";
import { projects } from "./data-store.js";

const getProject = (id) => projects.find((p) => p.id === id);

const server = http.createServer((req, res) => {
  if (req.url.match(/\/api\/projects/) && req.method === "GET") {
    const id = parseInt(req.url.split("/")[3]);
	//console.log("Id = " + id);
    if (!id) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "BAD REQUEST" }));
    } else {
      const project = getProject(id);
      //console.log("Project = " + project);
      if (!project) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Project Not Found" }));
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(project));
      }
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

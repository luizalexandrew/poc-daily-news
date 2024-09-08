var fs = require("fs");

export const CreateDir = (path: string) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
};

export default { 
    CreateDir
}
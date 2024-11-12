import fs from 'fs';
import path from 'path';

const ValidateFilePathAndName = (filePath, filename) => {
  if (!filePath ||!filename) {
    throw new Error("Debe especificar un path y un nombre para el archivo");
  }
}

export const readJsonFile = async (filepath, filename) => {
  ValidateFilePathAndName(filepath, filename);
  try {
    const content = await fs.promises.readFile(path.join(filepath, filename), 'utf8');
    return JSON.parse(content || "[]");
  } catch (error) {
    throw new Error("Error al leer el archivo");
    
  }
};

export const writeJsonFile = async (filepath, filename, content) => {
  ValidateFilePathAndName(filepath, filename);

  if (!content) throw new Error("El contenido no fue proporcionado");

  try {
    await fs.promises.writeFile(path.join(filepath, filename), JSON.stringify(content, null, "\t"), 'utf8');
    return JSON.parse(content || "[]");
  } catch (error) {
    throw new Error("Error al escribir el archivo");
    
  }
};
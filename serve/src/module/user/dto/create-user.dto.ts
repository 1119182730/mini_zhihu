export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  avatar: string;
}

interface Parameters {
  path: string;
  key: string;
  value: number;
  type: number;
}

interface ProjectItem {
  fileId: string;
  parameters: Parameters[];
  matrix: number[];
}

interface FrameworkItem extends ProjectItem {
  support: SupportItem[];
}

interface SupportItem extends ProjectItem {
  rotation: ProjectItem;
}

interface Project {
  framework: FrameworkItem[];
}

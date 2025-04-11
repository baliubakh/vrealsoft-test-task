export interface IGoogleLoginResponse {
  data: {
    token: string;
    user: {
      email: string;
      name: string;
      picture: string;
      sub: string;
    };
  };
}

export interface IFolder {
  id: number;
  name: string;
  userId: number;
  parentId: number | null;
  path: string;
  urlPath: string;
}

export interface IGetFoldersResponse {
  children: IFolder[];
  current?: IFolder;
}

export interface IFile {
  id: number;
  name: string;
}

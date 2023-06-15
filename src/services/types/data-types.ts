export interface UserTypes {
  id: number;
  username: string;
  email: string;
}

export interface PayloadTypes {
  user: UserTypes;
}

export interface DataTableTypes {
  _id: string;
  nama: string;
  alamat: string;
  noTelp: string;
  email: string;
  __v?: number;
}

export interface getAllDataTableTypes {
  data: DataTableTypes[];
}

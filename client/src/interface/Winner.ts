export interface Winner {
  _id?: string;
  contestTitle: string;
  winningDate: Date;
  image: string;
  username: string;
}

export interface NewWinner {
  winner?: Winner;
  error?: { message: string };
  status?: string;
}
export interface Winners {
  winners?: Winner[];
  error?: { message: string };
}

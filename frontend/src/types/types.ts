export interface client {
  id?: number,
  name: string,
}

export interface event {
  id: number,
  name: string,
  date: Date,
  client: number,
}

export interface entry {
  id: number,
  event: number,
  email: string,
  number: number,
}
import { Karateka } from './karateka.interface';

export interface Cours {
  id: string;
  sensei: string;
  date: string;
  heureDebut: string;
  heureFin: string;
  type: string;
  note: string;
  karateka: Karateka[];
}

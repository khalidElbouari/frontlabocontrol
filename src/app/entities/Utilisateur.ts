export class Utilisateur {
  nom: string;
  prenom: string;
  datenaiss: Date | null;
 /* photoName: string;
  profilePicture: File | null;*/
  username: string;
  password: string;
  enabled: boolean = true;


  constructor(nom: string, prenom: string, datenaiss: Date | null, username: string, password: string, enabled: boolean) {
    this.nom = nom;
    this.prenom = prenom;
    this.datenaiss = datenaiss;
    this.username = username;
    this.password = password;
    this.enabled = enabled;
  }
}

// interfacce

interface Iautomobile {
    marchio : string; 
    anno? : number; 
    chilometri? : number; 
    proprietario? : string; 
    usata? : boolean; 
}

class AUTO implements Iautomobile{
    marchio: string;
    chilometri : number; 
    proprietario : string; 

    constructor(proprietario : string, marchio : string){
        this.proprietario = proprietario; 
        this.marchio = marchio; 
    }

    RCA(assicurazione : boolean){
        console.log("ciao ", this.proprietario, " hai una ", this.marchio); 
        if(assicurazione){
            console.log("bravo tieni l'assicurazione");
        }else{
            console.log("assicurati e' obbligatorio!"); 
        }
    }
}

let Macchina = new AUTO("Francesco", "Fiat"); 
Macchina.RCA(true); 


class Rottamazione extends AUTO{
    darottamare : boolean; 
    
}
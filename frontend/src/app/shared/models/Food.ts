export class Food{
    id!:string;
    name!:string;
    price!:number;
    tags?: string[];
    favorite!:boolean;
    stars!: number;
    imageUrl!: string;
    origins!: string[];
    cookTime!:string;
    calories: number=0;  
    sizes: string[] = ['small', 'medium', 'large']; 
    
  }
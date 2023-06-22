//Interfaces
export interface SignUpResponse{
    email:string
    name:string
    token:string
    error:boolean
  }
export interface Error{
  error:string,
  err:boolean
}
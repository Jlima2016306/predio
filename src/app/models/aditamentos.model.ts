export class marcas{
  constructor(
    public id: Number,
    public name: String,
  ){}
}

export class modelos{
  constructor(
    public id: Number,
    public name: String,
    public marca: any
  ){}
}
export class Combustible{
  constructor(
    public id: Number,
    public name: String,
  ){}
}

export class dataCarros{
  constructor(
    public max: number,
    public min: number,
  ){}
}

export class dataSort{
  constructor(
    public value: any,
    public sort: any,
  ){}
}

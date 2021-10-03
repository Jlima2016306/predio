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

export class ventas{
  constructor(
    public vehicle_id	: any,
    public buyer_id: any,
  ){}

}

export class ventasBusqueda{
  constructor(
    public buyer_id		: any,
    public seller_id: any,
    public model_id	: any,
    public brand_id	: any,
    public amountRange	: any,
    public dateRange: any,

  ){}

}




export abstract class Discount {
  protected discount = 0
  calculate(value: number): number {
    return value - (value * this.discount)
  }
}

export class NoDiscount extends Discount {}

export class TenPercenteDiscount extends Discount {
  protected discount = 0.1
}

export class FiftyPerceteDiscont {
  protected discount = 0.5
}

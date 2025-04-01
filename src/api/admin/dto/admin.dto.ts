export class AllowSubmitProducts {
  submitId: number;

  userUUID: string;

  shopId: number;
}

export class RejectSubmitProducts {
  submitId: number;

  userUUID: string;

  shopId: number;

  rejectMessage: string;
}

export class AllowSubmitOperatingInfo {
  submitId: number;
  userUUID: string;
  shopId: number;
  operatingId: number;
}

export class RejectSubmitOperatingInfo {
  submitId: number;
  userUUID: string;
  operatingId: number;
  rejectedMessage: string;
}

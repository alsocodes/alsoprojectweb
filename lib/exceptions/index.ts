class BadInputException {
  public message: string;
  public code: number;
  constructor(msg: string) {
    this.message = msg;
    this.code = 400;
  }
}

class UniqueConstraintsException {
  public message: string;
  public code: number;
  constructor(msg: string) {
    this.message = msg;
    this.code = 400;
  }
}

class NotfoundException {
  public message: string;
  public code: number;
  constructor(msg: string) {
    this.message = msg;
    this.code = 404;
  }
}

class ForbiddenException {
  public message: string;
  public code: number;
  constructor(msg: string) {
    this.message = msg;
    this.code = 403;
  }
}

class UnauthorizedException {
  public message: string;
  public code: number;
  constructor(msg: string) {
    this.message = msg;
    this.code = 400;
  }
}

export {
  UniqueConstraintsException,
  NotfoundException,
  ForbiddenException,
  UnauthorizedException,
  BadInputException,
};

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCalback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService {
  constructor(
    private readonly successCallback: SuccessCalback,
    private readonly errorCallback: ErrorCallback,
  ) {}

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      this.successCallback();
      return true;
    } catch (error) {
      this.errorCallback((error as Error).message);
      return false;
    }
  }
}

export class GatewayError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "GatewayError";
    this.status = status;
  }
}

export function friendlyError(error: unknown): string {
  if (error instanceof GatewayError) {
    switch (error.status) {
      case 400:
        return "Something’s missing or in the wrong format. Check the details above and try again.";
      case 401:
      case 403:
        return "Your access key wasn’t accepted. Open Access key and request a new one.";
      case 404:
        return "Nothing was found for those details. Try a different value.";
      case 429:
        return "You’ve reached 100 lookups in 15 minutes. Wait a few minutes, then try again.";
      default:
        return "The service didn’t answer properly. Try again in a moment.";
    }
  }
  return "We couldn’t reach the gateway. Check your connection and try again.";
}

export function checkEnv(value: string | undefined | null): asserts value is string {
  if(!value) {
    throw new Error("Environment variable not set");
  }
}
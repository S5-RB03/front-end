function getEnvironmentVariable(key: string): string | undefined {
    if (process.env.NODE_ENV === 'production') {
      // In production, return the global environment variable
      return (window as any).env[key];
    } else {
      // In development, return the local environment variable
      return import.meta.env[key] as string;
    }
  }
  
  export default getEnvironmentVariable;
  
type Props = {
  error: any;
  resetErrorBoundary?: (...args: any[]) => void;
};

export default function FallbackRenderer({ error }: Props) {
  return (
    <div role="alert" className="container prose mx-auto p-4">
      <h1 className="dark:text-white">Something went wrong:</h1>
      <h3 className="text-red-800 dark:text-orange-400">{error.message}</h3>
    </div>
  );
}

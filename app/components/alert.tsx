interface AlertProps {
  variant?: 'primary' | 'info' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
}

export default function Alert({ variant, children }: AlertProps) {
  const baseStyles = "p-4 rounded-lg border text-sm flex items-center";
  
  const variants = {
    primary: "bg-blue-50 text-blue-800 border-blue-200",
    info: "bg-gray-50 text-gray-800 border-gray-200",
    success: "bg-green-50 text-green-800 border-green-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
    error: "bg-red-50 text-red-800 border-red-200"
  };

  const variantStyle = variant ? variants[variant] : variants.info;

  return (
    <div className={`${baseStyles} ${variantStyle}`} role="alert">
      {children}
    </div>
  );
}
  
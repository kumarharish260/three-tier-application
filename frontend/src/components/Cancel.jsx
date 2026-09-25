import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Cancel = ({ onBackToHome }) => {
  return (
    <div className="max-w-md mx-auto mt-16 p-8 text-center">
      <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Pagamento Cancelado
      </h1>
      <p className="text-gray-600 mb-6">
        Sua compra foi cancelada. Você pode tentar novamente quando quiser.
      </p>
      <Button onClick={onBackToHome} className="w-full">
        Voltar à Loja
      </Button>
    </div>
  );
};

export default Cancel;

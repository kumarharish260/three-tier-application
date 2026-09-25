import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Success = ({ onBackToHome }) => {
  return (
    <div className="max-w-md mx-auto mt-16 p-8 text-center">
      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Pagamento Realizado com Sucesso!
      </h1>
      <p className="text-gray-600 mb-6">
        Obrigado pela sua compra. Você receberá um email de confirmação em breve.
      </p>
      <Button onClick={onBackToHome} className="w-full">
        Voltar à Loja
      </Button>
    </div>
  );
};

export default Success;

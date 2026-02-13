'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionSchema, type TransactionFormData } from '@/lib/form-schemas';

const TRANSACTION_CATEGORIES = {
  income: ['Salário', 'Doação', 'Reembolso', 'Outro'],
  expense: ['Medicamentos', 'Salários', 'Equipamentos', 'Serviços', 'Manutenção', 'Outro'],
};

export function TransactionForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  const transactionType = watch('type');
  const categories = transactionType ? TRANSACTION_CATEGORIES[transactionType] : [];

  const onSubmit = async (data: TransactionFormData) => {
    try {
      console.log('Transação criada:', data);
      // TODO: Enviar para API
      // const response = await fetch('/api/transactions', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
    } catch (error) {
      console.error('Erro ao criar transação:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-900 mb-2">
            Tipo
          </label>
          <select
            {...register('type')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione um tipo</option>
            <option value="income">Entrada</option>
            <option value="expense">Saída</option>
          </select>
          {errors.type && (
            <span className="text-red-500 text-sm mt-1">{errors.type.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-900 mb-2">
            Valor (R$)
          </label>
          <input
            {...register('amount', { valueAsNumber: true })}
            type="number"
            step="0.01"
            placeholder="0.00"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.amount && (
            <span className="text-red-500 text-sm mt-1">{errors.amount.message}</span>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-900 mb-2">
          Categoria
        </label>
        <select
          {...register('category')}
          disabled={!transactionType}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        >
          <option value="">
            {transactionType ? 'Selecione uma categoria' : 'Selecione primeiro o tipo'}
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="text-red-500 text-sm mt-1">{errors.category.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2">
          Descrição
        </label>
        <textarea
          {...register('description')}
          placeholder="Descreva a transação..."
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.description && (
          <span className="text-red-500 text-sm mt-1">{errors.description.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-900 mb-2">
          Data
        </label>
        <input
          {...register('date', { valueAsDate: true })}
          type="date"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.date && (
          <span className="text-red-500 text-sm mt-1">{errors.date.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition"
      >
        {isSubmitting ? 'Registrando...' : 'Registrar Transação'}
      </button>
    </form>
  );
}

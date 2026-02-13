'use client';

import { useState, useEffect } from 'react';
import type { LancamentosFilters } from '@/types/lancamento';
import { MESES } from '@/types/lancamento';
import { BRAZILIAN_STATES } from '@/types/tenant';

interface Props {
  filters: LancamentosFilters;
  onFiltersChange: (filters: LancamentosFilters) => void;
  tiposRepasse: string[];
  contasBancarias: { banco: string; agencia: string; conta: string }[];
  anosDisponiveis: number[];
}

export function LancamentosFilters({
  filters,
  onFiltersChange,
  tiposRepasse,
  contasBancarias,
  anosDisponiveis,
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleAnoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const ano = e.target.value ? parseInt(e.target.value) : undefined;
    onFiltersChange({ ...filters, ano, page: 1 });
  };

  const handleMesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mes = e.target.value ? parseInt(e.target.value) : undefined;
    onFiltersChange({ ...filters, mes, page: 1 });
  };

  const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tpRepasse = e.target.value || undefined;
    onFiltersChange({ ...filters, tpRepasse, page: 1 });
  };

  const handleContaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valor = e.target.value;
    if (!valor) {
      onFiltersChange({
        ...filters,
        banco: undefined,
        agencia: undefined,
        conta: undefined,
        page: 1,
      });
      return;
    }

    const [banco, agencia, conta] = valor.split('|');
    onFiltersChange({ ...filters, banco, agencia, conta, page: 1 });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value || undefined;
    onFiltersChange({ ...filters, search, page: 1 });
  };

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cnpj = e.target.value || undefined;
    onFiltersChange({ ...filters, cnpj, page: 1 });
  };

  const handleMunicipioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const municipio = e.target.value || undefined;
    onFiltersChange({ ...filters, municipio, page: 1 });
  };

  const handleUfChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const uf = e.target.value || undefined;
    onFiltersChange({ ...filters, uf, page: 1 });
  };

  const handleLimpar = () => {
    onFiltersChange({ page: 1, limit: 20 });
  };

  const contaKey =
    filters.banco && filters.agencia && filters.conta
      ? `${filters.banco}|${filters.agencia}|${filters.conta}`
      : '';

  return (
    <div className="bg-white border rounded-lg p-4 space-y-4 sticky top-4">
      <h3 className="font-semibold text-lg text-gray-900">Filtros</h3>

      {/* Busca Geral */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Buscar
        </label>
        <input
          type="text"
          placeholder="Município ou entidade..."
          value={filters.search || ''}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>

      {/* CNPJ */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          CNPJ
        </label>
        <input
          type="text"
          placeholder="00.000.000/0000-00"
          value={filters.cnpj || ''}
          onChange={handleCnpjChange}
          maxLength={18}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">Busca exata por CNPJ</p>
      </div>

      {/* Município */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Município
        </label>
        <input
          type="text"
          placeholder="Nome do município..."
          value={filters.municipio || ''}
          onChange={handleMunicipioChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">Busca parcial no nome</p>
      </div>

      {/* UF */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Estado (UF)
        </label>
        <select
          value={filters.uf || ''}
          onChange={handleUfChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          <option value="">Todos os estados</option>
          {BRAZILIAN_STATES.map((estado) => (
            <option key={estado.code} value={estado.code}>
              {estado.code} - {estado.name}
            </option>
          ))}
        </select>
      </div>

      {/* Ano */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ano
        </label>
        <select
          value={filters.ano || ''}
          onChange={handleAnoChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          <option value="">Todos os anos</option>
          {anosDisponiveis.map((ano) => (
            <option key={ano} value={ano}>
              {ano}
            </option>
          ))}
        </select>
      </div>

      {/* Mês */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mês
        </label>
        <select
          value={filters.mes || ''}
          onChange={handleMesChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          <option value="">Todos os meses</option>
          {MESES.map((mes) => (
            <option key={mes.value} value={mes.value}>
              {mes.label}
            </option>
          ))}
        </select>
      </div>

      {/* Tipo de Repasse */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de Repasse
        </label>
        <select
          value={filters.tpRepasse || ''}
          onChange={handleTipoChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          <option value="">Todos os tipos</option>
          {tiposRepasse.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
      </div>

      {/* Conta Bancária */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Conta Bancária
        </label>
        <select
          value={contaKey}
          onChange={handleContaChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          <option value="">Todas as contas</option>
          {contasBancarias.map((conta) => (
            <option
              key={`${conta.banco}|${conta.agencia}|${conta.conta}`}
              value={`${conta.banco}|${conta.agencia}|${conta.conta}`}
            >
              {conta.banco} - Ag: {conta.agencia} - Conta: {conta.conta}
            </option>
          ))}
        </select>
      </div>

      {/* Botão Limpar */}
      <button
        onClick={handleLimpar}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Limpar Filtros
      </button>
    </div>
  );
}

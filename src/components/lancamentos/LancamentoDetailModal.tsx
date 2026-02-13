'use client';

import { formatCurrency, formatCNPJ, formatDate } from '@/lib/api/lancamentos-api';
import type { Lancamento } from '@/types/lancamento';

interface Props {
  lancamento: Lancamento | null;
  isOpen: boolean;
  onClose: () => void;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h4 className="font-semibold text-sm text-gray-900 mb-3 pb-2 border-b border-gray-200">
        {title}
      </h4>
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: any;
  highlight?: boolean;
}) {
  return (
    <div>
      <dt className="text-xs text-gray-600 font-medium uppercase tracking-wide">
        {label}
      </dt>
      <dd
        className={`text-sm mt-1 ${
          highlight ? 'font-semibold text-green-600' : 'text-gray-900 font-medium'
        }`}
      >
        {value || '-'}
      </dd>
    </div>
  );
}

export function LancamentoDetailModal({ lancamento, isOpen, onClose }: Props) {
  if (!isOpen || !lancamento) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Detalhes do Lançamento
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Identificação */}
          <Section title="Identificação">
            <Field label="CNPJ" value={formatCNPJ(lancamento.cnpj)} />
            <Field label="Processo" value={lancamento.nuProcesso} />
            <Field label="Portaria" value={lancamento.nuPortaria} />
            <Field label="Data Portaria" value={formatDate(lancamento.dtPortaria)} />
          </Section>

          {/* Período */}
          <Section title="Período">
            <Field label="Ano" value={lancamento.ano} />
            <Field label="Mês" value={String(lancamento.mes).padStart(2, '0')} />
            <Field label="Competência" value={lancamento.nuCompetencia} />
            <Field label="Dia Pagamento" value={lancamento.diaPagamento} />
          </Section>

          {/* Tipo e Repasse */}
          <Section title="Tipo e Repasse">
            <Field label="Tipo Repasse" value={lancamento.tpRepasse} />
            <Field label="Bloco" value={lancamento.bloco} />
            <Field label="Componente" value={lancamento.componente} />
            <Field label="Programa" value={lancamento.programa} />
            <Field label="Nº OB" value={lancamento.nuOb} />
            <Field label="Nº Proposta" value={lancamento.nuProposta} />
            <Field label="Tipo Recurso" value={lancamento.coTipoRecurso} />
            <Field label="Recurso COVID/Normal" value={lancamento.recursoCOVIDOUNormal} />
          </Section>

          {/* Localização */}
          <Section title="Localização">
            <Field label="UF" value={lancamento.uf} />
            <Field label="Município" value={lancamento.municipio} />
            <Field label="Código IBGE" value={lancamento.coMunicipioIbge} />
            <Field label="Entidade" value={lancamento.entidade} />
          </Section>

          {/* Valores Financeiros */}
          <Section title="Valores Financeiros">
            <Field label="Valor Bruto" value={formatCurrency(lancamento.valorBruto)} />
            <Field label="Desconto" value={formatCurrency(lancamento.desconto)} />
            <Field
              label="Valor Líquido"
              value={formatCurrency(lancamento.valorLiquido)}
              highlight
            />
          </Section>

          {/* Dados Bancários */}
          <Section title="Dados Bancários">
            <Field label="Banco" value={lancamento.banco} />
            <Field label="Agência" value={lancamento.agencia} />
            <Field label="Conta" value={lancamento.conta} />
            <Field label="Data Saldo Conta" value={formatDate(lancamento.dtSaldoConta)} />
            <Field
              label="Valor Saldo Conta"
              value={lancamento.vlSaldoConta ? formatCurrency(lancamento.vlSaldoConta) : '-'}
            />
          </Section>

          {/* Marcadores */}
          <Section title="Marcadores">
            <Field label="Emenda COVID" value={lancamento.marcadorEmendaCOVID} />
          </Section>

          {/* Auditoria */}
          <Section title="Auditoria">
            <Field label="Criado em" value={formatDate(lancamento.criadoEm)} />
            <Field label="Atualizado em" value={formatDate(lancamento.atualizadoEm)} />
          </Section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

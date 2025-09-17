import React, { useMemo } from 'react';
import { CrownIcon } from './icons/CrownIcon';

interface TotalsFooterProps {
  totals: number[];
  supermarkets: string[];
}

const TotalsFooter: React.FC<TotalsFooterProps> = ({ totals, supermarkets }) => {

  const { minTotal, winnerIndex } = useMemo(() => {
    if (totals.length === 0) {
      return { minTotal: null, winnerIndex: -1 };
    }
    const validTotals = totals.filter(t => t > 0);
    if(validTotals.length === 0) {
        return { minTotal: null, winnerIndex: -1 };
    }
    const minTotalValue = Math.min(...validTotals);
    const winnerIdx = totals.findIndex(t => t === minTotalValue);
    return { minTotal: minTotalValue, winnerIndex: winnerIdx };
  }, [totals]);


  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] px-2 py-1 sm:p-4 z-30">
        <h3 className="hidden sm:block text-base sm:text-lg font-bold text-center mb-2 text-slate-700">Totais da Compra</h3>
        <div className="flex flex-row justify-around items-start gap-1 sm:gap-2">
            {supermarkets.map((name, index) => {
                const isWinner = index === winnerIndex;
                const total = totals[index];
                let percentageDiff = null;

                if (minTotal !== null && total > minTotal && minTotal > 0) {
                    percentageDiff = (((total - minTotal) / minTotal) * 100).toFixed(0);
                }

                return (
                    <div key={index} className={`flex-1 text-center p-1 sm:p-2 rounded-lg transition-all duration-300 flex flex-col justify-between ${isWinner ? 'bg-green-100 border-2 border-green-300' : 'bg-slate-100'}`}>
                        <div>
                            <div className="flex items-center justify-center gap-1">
                            {isWinner && <CrownIcon className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500" />}
                            <p className="font-semibold text-xs sm:text-sm text-slate-600 truncate" title={name}>{name}</p>
                            </div>
                            <p className={`text-base sm:text-2xl font-bold ${isWinner ? 'text-green-600' : 'text-slate-800'}`}>
                                {formatCurrency(totals[index])}
                            </p>
                        </div>
                        <div className="h-4 mt-1">
                            {percentageDiff && (
                                <div className="text-xs font-semibold text-red-500">
                                    +{percentageDiff}%
                                </div>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  );
};

export default TotalsFooter;